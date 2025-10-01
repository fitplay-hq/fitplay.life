import { VendorCreateInputObjectSchema } from "@/lib/generated/zod/schemas";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@/lib/generated/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input with Zod
    const parsed = VendorCreateInputObjectSchema.parse(body);

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    const vendor = await prisma.vendor.create({
      data: {
        ...parsed,
        password: hashedPassword,
      },
    });

    return new NextResponse(JSON.stringify(vendor), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error creating vendor:", error);

    if (error.name === "ZodError") {
      return new NextResponse(JSON.stringify({ error: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Unique constraint violation
        return new NextResponse(
          JSON.stringify({ error: "Vendor with this email or phone already exists" }),
          { status: 409, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    return new NextResponse(JSON.stringify({ error: "Failed to create vendor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
