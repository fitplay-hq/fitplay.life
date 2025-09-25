import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// get all orders of an employee
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (session.user.role === "ADMIN" || session.user.role === "HR") {
            const { searchParams } = new URL(req.url);
            const userId = searchParams.get("userId");

            const orders = await prisma.order.findMany({
                where: userId ? { userId } : {},
                include: {
                    items: {
                        include: {
                            variant: {
                                include: {
                                    product: true,
                                },
                            },
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            company: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            return NextResponse.json({ orders });
        }
        else {
            const userId = session.user.id;
            const orders = await prisma.order.findMany({
                where: { userId },
                include: {
                    items: {
                        include: {
                            variant: {
                                include: {
                                    product: true,
                                },
                            },
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            company: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            return NextResponse.json({ orders });
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}