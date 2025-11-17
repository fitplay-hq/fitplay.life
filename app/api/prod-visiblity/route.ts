import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "HR") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { productId, companyIds } = await req.json();

        if (!productId || !Array.isArray(companyIds)) {
            return NextResponse.json(
                { error: "productId and companyIds are required" },
                { status: 400 }
            );
        }

        const updated = await prisma.product.update({
            where: { id: productId },
            data: {
                companies: {
                    set: companyIds.map(id => ({ id }))
                }
            },
            include: { companies: true }
        });

        return NextResponse.json({
            message: "Company visibility updated successfully",
            product: updated
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
