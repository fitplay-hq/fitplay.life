import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { companyId, code, credits, description, expiryDate } = body;

        const session = await getServerSession(authOptions);

        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;


        if (!code || !credits || !expiryDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const voucher = await prisma.voucher.create({
            data: {
                code,
                description: description || null,
                credits: Number(credits),         // <-- FIX
                expiryDate: new Date(expiryDate),
                companies: {
                    connect: { id: companyId },
                },
            }
        });

        return NextResponse.json({
            message: "Voucher created successfully",
            voucher,
        });

    } catch (err) {
        console.error("Voucher Create Error:", err); // <-- Log actual error
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

