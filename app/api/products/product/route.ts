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
  console.log('Session in requireAdmin:', session); // Debug log
  
  if (!session || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    // required fields validation
    const requiredFields = ["name", "sku", "availableStock", "category", "description"];
    const missing = requiredFields.filter(f => body[f] === undefined);
    if (missing.length > 0) {
      return NextResponse.json(
        { message: `Missing fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const {
      vendorName,
      variants,
      companies, // ignored intentionally
      orderItems, // ignored intentionally
      vendorId,
      ...productData
    } = body;

    let resolvedVendorId: string | null = null;

    // Priority: vendorId from dropdown, then vendorName as fallback
    if (vendorId) {
      resolvedVendorId = vendorId;
    } else if (vendorName) {
      const vendor = await prisma.vendor.findFirst({
        where: { name: vendorName },
        select: { id: true },
      });

      if (!vendor) {
        return NextResponse.json(
          { message: `Vendor '${vendorName}' not found` },
          { status: 400 }
        );
      }

      resolvedVendorId = vendor.id;
    }

    const createdProduct = await prisma.product.create({
      data: {
        ...productData,
        vendorId: resolvedVendorId,
        variants: variants?.create
          ? {
              create: variants.create.map((v: any) => ({
                variantCategory: v.variantCategory,
                variantValue: v.variantValue,
                mrp: v.mrp,
                credits: v.credits ?? null,
                availableStock: v.availableStock ?? null,
              })),
            }
          : undefined,
      },
      include: {
        vendor: true,
        variants: true,
      },
    });

    return NextResponse.json(
      { message: "Product created successfully", data: createdProduct },
      { status: 201 }
    );

  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
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
          vendor: {
            select: {
              name: true,
            },
          },
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
          vendor: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
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
    const result = ProductUpdateInputObjectSchema.safeParse(body);

    if (!result.success) {
      console.error("Product update failed:", result.error.format());
      return NextResponse.json({ message: "Invalid product data", error: result.error.format() }, { status: 400 });
    }

    const productData = result.data;
    if (!productData.id) {
      return NextResponse.json({ message: "Product ID is required for update" }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id: String(productData.id) },
      data: productData,
    });

    return NextResponse.json({ message: "Product updated successfully", data: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating product", error }, { status: 500 });
  }
}
