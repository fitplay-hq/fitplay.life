import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log('Creating product with data:', body);

    // Required fields validation
    const requiredFields = ["name", "sku", "availableStock", "category"];
    const missing = requiredFields.filter(f => !body[f]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const {
      vendorName,
      variants,
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
          { error: `Vendor '${vendorName}' not found` },
          { status: 400 }
        );
      }

      resolvedVendorId = vendor.id;
    }

    const createdProduct = await prisma.product.create({
      data: {
        ...productData,
        vendorId: resolvedVendorId,
        variants: variants?.length > 0
          ? {
              create: variants.map((v: any) => ({
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
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, variants, vendorId, vendorName, ...productData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    let resolvedVendorId: string | null = vendorId || null;

    if (vendorName && !vendorId) {
      const vendor = await prisma.vendor.findFirst({
        where: { name: vendorName },
        select: { id: true },
      });

      if (vendor) {
        resolvedVendorId = vendor.id;
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        vendorId: resolvedVendorId,
        variants: variants?.deleteMany !== undefined
          ? {
              deleteMany: {},
              create: variants.create || [],
            }
          : undefined,
      },
      include: {
        vendor: true,
        variants: true,
      },
    });

    return NextResponse.json(
      { message: "Product updated successfully", data: updatedProduct },
      { status: 200 }
    );

  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Product deletion error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}