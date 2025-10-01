import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {

        const query = req.nextUrl.searchParams.get("query");

        if (!query || query.trim() === "") {
            return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
        }

        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: query.trim(),
                    mode: "insensitive"
                }
            },
            include: {
                variants: true,
                vendor: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!products || products.length === 0) {
            return NextResponse.json({ error: "No products found" }, { status: 404 });
        }

        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}