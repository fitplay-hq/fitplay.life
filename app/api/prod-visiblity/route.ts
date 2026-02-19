import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    // 1️⃣ Get session safely
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Parse body ONCE
    const body = await req.json();
    const { productId, companyIds, visible } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }

    // ============================
    // ADMIN LOGIC
    // ============================
    if (session.user.role === "ADMIN") {

      if (!Array.isArray(companyIds)) {
        return NextResponse.json(
          { error: "companyIds must be an array" },
          { status: 400 }
        );
      }

      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          companies: {
            set: companyIds.map((id: string) => ({ id })),
          },
        },
        include: {
          companies: true,
        },
      });

      return NextResponse.json({
        message: "Product visibility updated (Admin)",
        product: updatedProduct,
      });
    }

    // ============================
    // HR LOGIC
    // ============================
    else if (session.user.role === "HR") {

      if (typeof visible !== "boolean") {
        return NextResponse.json(
          { error: "visible must be true or false" },
          { status: 400 }
        );
      }

      // 🚨 IMPORTANT: Get companyId from DB (NOT frontend)
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { companyId: true },
      });

      if (!user?.companyId) {
        return NextResponse.json(
          { error: "HR has no company assigned" },
          { status: 400 }
        );
      }

      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          companies: visible
            ? { connect: { id: user.companyId } }
            : { disconnect: { id: user.companyId } },
        },
        include: {
          companies: true,
        },
      });

      return NextResponse.json({
        message: "Visibility updated (HR)",
        product: updatedProduct,
      });
    }

    // ============================
    // OTHER ROLES BLOCKED
    // ============================
    else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

  } catch (error) {
    console.error("Visibility update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
