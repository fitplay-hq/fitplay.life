import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
        const vendors = await prisma.vendor.findMany();
        return new NextResponse(JSON.stringify(vendors), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching vendors:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to fetch vendors" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}