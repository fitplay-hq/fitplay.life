import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ProductCreateInputObjectSchema} from "@/prisma/generated/schemas";
import { getServerSession } from "next-auth";
import { auth } from "../../auth/[...nextauth]/route";
import { v4 as uuidv4 } from "uuid";
import { Prisma } from "@/lib/generated/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const session = await getServerSession(auth);
        if (!session || session.user.role !== "ADMIN" || session.user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        if (!Array.isArray(body)) {
            return NextResponse.json({ message: "Invalid request body, expected array of Products" }, { status: 400 });
        }
        const parsedProducts = body.map((p, idx) => {
            const result = ProductCreateInputObjectSchema.safeParse(p);
            if (!result.success) {
                console.error(`Product at index ${idx} failed validation:`, result.error);
                throw new Error(`Product at index ${idx} failed validation`);
            }
            return result.data;
        });

        const productsData: Prisma.ProductCreateInput[] = parsedProducts.map((p) => ({
            id: uuidv4(),
            ...p
        }))

        const products = await prisma.product.createMany({
            data: productsData,
            skipDuplicates: true,
        });

        return NextResponse.json({ message: "Products Added successfully", status: 201, data: products });

    } catch (error) {
        return NextResponse.json({ message: "Error creating products", error }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(auth);
        if (!session || session.user.role !== "ADMIN" || session.user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const sortBy = searchParams.get("sortBy") || "name";
        const sortOrder = searchParams.get("sortOrder") || "asc";

        // Define allowed sort fields for security
        const allowedSortFields = ["name", "price", "creat                                  edAt", "updatedAt"];
        const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "name";
        const safeSortOrder = sortOrder === "desc" ? "desc" : "asc";

        const products = await prisma.product.findMany({
            orderBy: {
                [safeSortBy]: safeSortOrder,
            },
        });
        return NextResponse.json({ message: "Products retrieved successfully", data: products });
    } catch (error) {
        return NextResponse.json({ message: "Error retrieving products", error }, { status: 500 });
    }
}