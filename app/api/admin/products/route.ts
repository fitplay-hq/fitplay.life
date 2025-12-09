import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

function normalize(value: any) {
  return typeof value === "string" ? value : value?.name;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      sku,
      availableStock,
      category,
      subCategory,
      vendorId,
      vendorName,
      variants,
      ...rest
    } = body;

    // Normalize category/subcategory in case UI sends object
    const normalizedCategory = normalize(category);
    const normalizedSubCategory = normalize(subCategory);

    if (!name || !sku || !availableStock || !normalizedCategory) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Resolve vendor
    let finalVendorId = vendorId?.trim();
    if (!finalVendorId && vendorName) {
      const vendor = await prisma.vendor.findFirst({
        where: { name: vendorName.trim() },
      });
      if (!vendor)
        return NextResponse.json(
          { error: `Vendor '${vendorName}' not found` },
          { status: 400 }
        );

      finalVendorId = vendor.id;
    }

    // Resolve category
    const foundCategory = await prisma.category.findUnique({
      where: { name: normalizedCategory },
    });

    if (!foundCategory)
      return NextResponse.json(
        { error: `Category '${normalizedCategory}' not found` },
        { status: 400 }
      );

    // Resolve subcategory
    let foundSub = null;
    if (normalizedSubCategory) {
      foundSub = await prisma.subCategory.findFirst({
        where: {
          name: normalizedSubCategory,
          categoryId: foundCategory.id,
        },
      });

      if (!foundSub)
        return NextResponse.json(
          {
            error: `Subcategory '${normalizedSubCategory}' doesn't belong to '${normalizedCategory}'`,
          },
          { status: 400 }
        );
    }

    const created = await prisma.product.create({
      data: {
        ...rest,
        vendor: finalVendorId ? { connect: { id: finalVendorId } } : undefined,
        category: { connect: { id: foundCategory.id } },
        ...(foundSub && { subCategory: { connect: { id: foundSub.id } } }),
        variants: variants?.length ? { create: variants } : undefined,
      },
      include: {
        vendor: true,
        category: true,
        subCategory: true,
        variants: true,
      },
    });

    return NextResponse.json(
      { message: "Product created", data: created },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal error", details: String(err) },
      { status: 500 }
    );
  }
}


// ---------------- PATCH -------------------

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, category, subCategory, vendorId, vendorName, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Normalize category/subcategory
    const normalizedCategory = normalize(category);
    const normalizedSubCategory = normalize(subCategory);

    delete rest.vendorId;
    delete rest.vendorName;
    delete rest.category;
    delete rest.subCategory;

    const updateData: any = { ...rest };

    // Vendor handling
    let finalVendorId = vendorId?.trim();
    if (!finalVendorId && vendorName) {
      const vendor = await prisma.vendor.findFirst({
        where: { name: vendorName.trim() },
      });
      if (vendor) finalVendorId = vendor.id;
    }

    updateData.vendor = finalVendorId
      ? { connect: { id: finalVendorId } }
      : { disconnect: true };

    // Category + Subcategory handling
    if (normalizedCategory) {
      const foundCategory = await prisma.category.findUnique({
        where: { name: normalizedCategory },
      });

      if (!foundCategory)
        return NextResponse.json(
          { error: `Category '${normalizedCategory}' not found` },
          { status: 400 }
        );

      updateData.category = { connect: { id: foundCategory.id } };

      if (normalizedSubCategory) {
        const foundSub = await prisma.subCategory.findFirst({
          where: { name: normalizedSubCategory, categoryId: foundCategory.id },
        });

        if (!foundSub)
          return NextResponse.json(
            { error: `Invalid Subcategory '${normalizedSubCategory}'` },
            { status: 400 }
          );

        updateData.subCategory = { connect: { id: foundSub.id } };
      }
    }

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        vendor: true,
        category: true,
        subCategory: true,
        variants: true,
      },
    });

    return NextResponse.json({ message: "Updated successfully", data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal error", details: String(err) },
      { status: 500 }
    );
  }
}


// ---------------- DELETE -------------------

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = new URL(req.url).searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product deletion error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
