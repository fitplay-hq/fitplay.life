import { authOptions } from "@/lib/auth";
import {
  ProductCreateInputObjectSchema,
  ProductUpdateInputObjectSchema,
} from "@/lib/generated/zod/schemas";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN" || session.user.email !== process.env.ADMIN_EMAIL) {
    return null;
  }
  return session;
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const result = ProductCreateInputObjectSchema.safeParse(body);

    if (!result.success) {
      console.error("Product creation failed:", result.error.format());
      return NextResponse.json({ message: "Invalid product data", error: result.error.format() }, { status: 400 });
    }

    const productData = result.data;

    const created = await prisma.product.create({
      data: productData,
    });

    return NextResponse.json({ message: "Product created successfully", data: created }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating product", error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          variants: true,
        },
      });
      if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Product fetched successfully", data: product });
    } else {
      const products = await prisma.product.findMany({
        include: {
          variants: true,
        },
      });
      console.log("Fetched products with variants:", products.map(p => ({ id: p.id, name: p.name, variants: p.variants })));
      return NextResponse.json({ message: "Products fetched successfully", data: products });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching products", error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) 
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = req.nextUrl.searchParams.get("id");
    if (!id) 
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });

    // 1️⃣ Delete all variants associated with this product
    await prisma.variant.deleteMany({ where: { productId: id } });

    // 2️⃣ Delete the product itself
    const deleted = await prisma.product.delete({ where: { id } });

    return NextResponse.json({ message: "Product and its variants deleted successfully", data: deleted });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error deleting product", error }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { variants, ...productData } = body;

    const result = ProductUpdateInputObjectSchema.safeParse(productData);

    if (!result.success) {
      console.error("Product update failed:", result.error.format());
      return NextResponse.json({ message: "Invalid product data", error: result.error.format() }, { status: 400 });
    }

    if (!productData.id) {
      return NextResponse.json({ message: "Product ID is required for update" }, { status: 400 });
    }

    // Update the product (without variants)
    const updated = await prisma.product.update({
      where: { id: String(productData.id) },
      data: productData,
    });

    // Handle variants: delete existing and create new
    if (variants) {
      await prisma.variant.deleteMany({ where: { productId: productData.id } });
      if (variants.length > 0) {
        await prisma.variant.createMany({
          data: variants.map((v: any) => ({
            variantCategory: v.variantCategory,
            variantValue: v.variantValue,
            mrp: v.mrp,
            credits: v.credits || null,
            productId: productData.id,
          })),
        });
      }
    }

    return NextResponse.json({ message: "Product updated successfully", data: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating product", error }, { status: 500 });
  }
}
