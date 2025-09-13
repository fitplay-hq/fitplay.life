
import { authOptions } from "@/lib/auth";
import { ProductCreateInputObjectSchema } from "@/lib/generated/zod/schemas";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN" || session.user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const result = ProductCreateInputObjectSchema.safeParse(body);
        if (!result.success) {
            console.error("Product creation failed:", result.error);
            return NextResponse.json({ message: "Invalid product data", error: result.error }, { status: 400 });
        }

        const productData = result.data;
        const product = await prisma.product.create({
            data: {
                ...productData,
            },
        });

        return NextResponse.json({ message: "Product created successfully", data: product }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Error creating product", error }, { status: 500 });

    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN" || session.user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const id = req.nextUrl.searchParams.get("id");
        if (id) {
            const product = await prisma.product.findUnique({ where: { id } });
            if (!product) {
                return NextResponse.json({ message: "Product not found" }, { status: 404 });
            }
            return NextResponse.json({ message: "Product fetched successfully", data: product }, { status: 200 });
        } else {
            const products = await prisma.product.findMany();
            return NextResponse.json({ message: "Products fetched successfully", data: products }, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ message: "Error fetching products", error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN" || session.user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const id = req.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
        }

        const product = await prisma.product.delete({ where: { id } });
        return NextResponse.json({ message: "Product deleted successfully", data: product }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error deleting product", error }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN" || session.user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const result = ProductCreateInputObjectSchema.safeParse(body);
        if (!result.success) {
            console.error("Product update failed:", result.error);
            return NextResponse.json({ message: "Invalid product data", error: result.error }, { status: 400 });
        }

        const productData = result.data;
        if (!productData.id) {
            return NextResponse.json({ message: "Product ID is required for update" }, { status: 400 });
        }

        const product = await prisma.product.update({
            where: { id: productData.id },
            data: {
                ...productData,
            },
        });

        return NextResponse.json({ message: "Product updated successfully", data: product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating product", error }, { status: 500 });
    }
}