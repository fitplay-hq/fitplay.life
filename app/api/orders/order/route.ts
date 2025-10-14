import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const {
            items,
            userId: requestedUserId,
            phNumber: providedPhNumber,
            address: providedAddress,
            deliveryInstructions,
            remarks,
        } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "items are required" }, { status: 400 });
        }

        // Determine userId based on role
        let userId: string;
        if (session.user.role === "ADMIN" || session.user.role === "HR") {
            userId = requestedUserId || session.user.id;
        } else {
            userId = session.user.id;
        }

        // Get user with wallet
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { wallet: true },
        });

        if (!user || !user.wallet) {
            return NextResponse.json({ error: "User wallet not found" }, { status: 404 });
        }

        // Determine address and phone
        let finalPhNumber: string | null = null;
        let finalAddress: string | null = null;
        const finalDeliveryInstructions: string | null = deliveryInstructions ?? null;

        if (session.user.role === "ADMIN") {
            if (!providedPhNumber || !providedAddress) {
                return NextResponse.json(
                    { error: "Admin must provide phNumber and address" },
                    { status: 400 }
                );
            }
            finalPhNumber = providedPhNumber;
            finalAddress = providedAddress;
        } else {
            finalPhNumber = providedPhNumber || user.phone;
            finalAddress = providedAddress || user.address || null;
        }

        // Calculate order total
        let totalAmount = 0;
        const orderItemsData: any[] = [];

        for (const item of items) {
            const variant = await prisma.variant.findUnique({
                where: { id: item.variantId },
                include: { product: true },
            });

            if (!variant || !variant.product) {
                return NextResponse.json(
                    { error: `Variant with id ${item.variantId} not found` },
                    { status: 404 }
                );
            }

            if ((variant.availableStock ?? 0) < item.quantity) {
                return NextResponse.json(
                    { error: `Not enough stock for variant ${variant.variantValue}` },
                    { status: 400 }
                );
            }

            const mrp = variant.mrp;
            const discountPercent = variant.product.discount ?? 0;
            const discountedPrice = Math.max(
                mrp - Math.floor((mrp * discountPercent) / 100),
                0
            );

            const lineTotal = discountedPrice * item.quantity;
            totalAmount += lineTotal;

            orderItemsData.push({
                productId: variant.product.id,
                variantId: variant.id,
                quantity: item.quantity,
                price: discountedPrice,
            });
        }

        if (user.wallet.balance < totalAmount) {
            return NextResponse.json({ error: "Insufficient wallet balance" }, { status: 400 });
        }

        // Transaction: deduct balance, create order + transaction ledger
        const result: { enrichedOrder: any; updatedWallet: any } = await prisma.$transaction(async (tx) => {
            const updatedWallet = await tx.wallet.update({
                where: { id: user.wallet!.id },
                data: { balance: { decrement: totalAmount } },
            });

            const transaction = await tx.transactionLedger.create({
                data: {
                    userId: user.id,
                    amount: totalAmount,
                    modeOfPayment: "Credits",
                    isCredit: false,
                    walletId: updatedWallet.id,
                },
            });

            const order = await tx.order.create({
                data: {
                    userId: user.id,
                    amount: totalAmount,
                    status: "PENDING",
                    transactionId: transaction.id,
                    phNumber: finalPhNumber,
                    address: finalAddress,
                    deliveryInstructions: finalDeliveryInstructions,
                    remarks: session.user.role === "ADMIN" ? remarks || null : null,
                    items: {
                        create: orderItemsData,
                    },
                },
                include: { items: true },
            });

            // Decrease variant stock for each item
            for (const item of orderItemsData) {
                await tx.variant.update({
                    where: { id: item.variantId },
                    data: { availableStock: { decrement: item.quantity } },
                });
            }

            const enrichedOrder = await tx.order.findUnique({
                where: { id: order.id },
                include: {
                    items: {
                        include: {
                            product: { select: { name: true, images: true } },
                            variant: true,
                        },
                    },
                },
            });

            if (!enrichedOrder) throw new Error("Order not found after creation");

            return { enrichedOrder, updatedWallet };
        });

        return NextResponse.json({
            message: "Order created successfully",
            order: result.enrichedOrder,
            wallet: result.updatedWallet,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Can't create order", details: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Order id is required" }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        variant: {
                            include: { product: true },
                        },
                    },
                },
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const sanitizedOrder =
            session.user.role === "ADMIN"
                ? order
                : (() => {
                      const { remarks, ...rest } = order;
                      return rest;
                  })();

        return NextResponse.json({ data: sanitizedOrder });
    } catch (error) {
        return NextResponse.json({ message: "Error retrieving order", error }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (session.user.role !== "ADMIN" && session.user.role !== "HR") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "Order id is required" }, { status: 400 });
        }

        const body = await req.json();
        const { action } = body;

        if (!action || !["approve", "reject", "dispatch"].includes(action)) {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        const statusMap: Record<string, any> = {
            approve: "APPROVED",
            reject: "CANCELLED",
            dispatch: "DISPATCHED",
        };

        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        if (action === "reject") {
            // Restock the variants
            for (const item of order.items) {
                if (!item.variantId) continue;
                await prisma.variant.update({
                    where: { id: item.variantId },
                    data: { availableStock: { increment: item.quantity } },
                });
            }
        }

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: {
                status: statusMap[action] as any,
                remarks: session.user.role === "ADMIN" && action === "reject" ? body.remarks || null : undefined,
            },
        });

        return NextResponse.json({
            message: `Order ${action}d successfully`,
            order: updatedOrder,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Can't update order", details: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "Order id is required" }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Restock the variants before deleting
        for (const item of order.items) {
            if (!item.variantId) continue;
            await prisma.variant.update({
                where: { id: item.variantId },
                data: { availableStock: { increment: item.quantity } },
            });
        }

        await prisma.orderItem.deleteMany({ where: { orderId: id } });
        await prisma.order.delete({ where: { id } });

        return NextResponse.json({ message: "Order deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting order", error }, { status: 500 });
    }
}
