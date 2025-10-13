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
        const { items, userId: requestedUserId } = body;

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "items are required" },
                { status: 400 }
            );
        }

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

        // Calculate order total
        let totalAmount = 0;
        const orderItemsData: any[] = [];

        for (const item of items) {
            // Fetch variant (price comes from here)
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

            // Check stock availability
            if (variant.product.availableStock < item.quantity) {
                return NextResponse.json(
                    { error: `Not enough stock for product ${variant.product.name}` },
                    { status: 400 }
                );
            }

            // Calculate price: MRP - %discount
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
                price: discountedPrice, // snapshot price
            });
        }

        // Check wallet balance
        if (user.wallet.balance < totalAmount) {
            return NextResponse.json(
                { error: "Insufficient wallet balance" },
                { status: 400 }
            );
        }

        // Deduct from wallet and create transaction + order atomically
        const result = await prisma.$transaction(async (tx) => {
            // Deduct balance
            const updatedWallet = await tx.wallet.update({
                where: { id: user.wallet!.id },
                data: { balance: { decrement: totalAmount } },
            });

            // Create transaction ledger
            const transaction = await tx.transactionLedger.create({
                data: {
                    userId: user.id,
                    amount: totalAmount,
                    modeOfPayment: "Credits",
                    isCredit: false,
                    walletId: updatedWallet.id,
                },
            });

            // Create order and items
            const order = await tx.order.create({
                data: {
                    userId: user.id,
                    amount: totalAmount,
                    status: "PENDING",
                    transactionId: transaction.id,
                    remarks: session.user.role === "ADMIN" ? body.remarks || null : null,
                    items: {
                        create: orderItemsData,
                    },
                },
                include: { items: true },
            });

            if (!order) {
                // return credits to the wallet in case of failure
                const updatedWallet = await tx.wallet.update({
                    where: { id: user.wallet!.id },
                    data: { balance: { increment: totalAmount } },
                });

                const transaction = await tx.transactionLedger.create({
                    data: {
                        userId: user.id,
                        amount: totalAmount,
                        modeOfPayment: "Credits",
                        isCredit: true,
                        walletId: updatedWallet.id,
                    },
                });
                throw new Error("Order creation failed");
            } else {
                // Decrease stock for each product variant
                for (const item of orderItemsData) {
                    const variant = await tx.variant.findUnique({
                        where: { id: item.variantId },
                        include: { product: true },
                    });

                    if (variant && variant.product) {
                        await tx.product.update({
                            where: { id: variant.product.id },
                            data: {
                                availableStock: {
                                    decrement: item.quantity,
                                },
                            },
                        });
                    }
                }
            }

            return { order, updatedWallet };
        });

        return NextResponse.json({
            message: "Order created successfully",
            order: result.order,
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
                    },
                },
            },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // 🚨 Remove remarks if user is not ADMIN
        const sanitizedOrder =
            session.user.role === "ADMIN"
                ? order
                : (() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { remarks, ...rest } = order;
                    return rest;
                })();

        return NextResponse.json({ data: sanitizedOrder });
    } catch (error) {
        console.error("Error retrieving order:", error);
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

        if (action === "reject" && order.status !== "PENDING") {
            return NextResponse.json({ error: "Can only reject pending orders" }, { status: 400 });
        }

        if (action === "approve" && order.status !== "PENDING") {
            return NextResponse.json({ error: "Can only approve pending orders" }, { status: 400 });
        }

        if (action === "dispatch" && order.status !== "APPROVED") {
            return NextResponse.json({ error: "Can only dispatch approved orders" }, { status: 400 });
        }

        if (action !== "reject") {
            const updatedOrder = await prisma.order.update({
                where: { id },
                data: { status: statusMap[action] as any },
            });
            return NextResponse.json({
                message: `Order ${action}d successfully`,
                order: updatedOrder,
            });
        }
        else {
            // Restore stock for each product variant in the order
            for (const item of order.items) {
                if (!item.variantId) continue;

                const variant = await prisma.variant.findUnique({
                    where: { id: item.variantId },
                    include: { product: true },
                });

                if (variant && variant.productId) {
                    await prisma.product.update({
                        where: { id: variant.productId },
                        data: {
                            availableStock: {
                                increment: item.quantity,
                            },
                        },
                    });
                }
            }

            const updatedOrder = await prisma.order.update({
                where: { id },
                data: { 
                    status: statusMap[action] as any,
                    remarks: session.user.role === "ADMIN" ? body.remarks || null : null,
                 },
            });
            return NextResponse.json({
                message: `Order ${action}d successfully`,
                order: updatedOrder,
            });
        }
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

        // Fetch order with items and variants
        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        await prisma.orderItem.deleteMany({ where: { orderId: id } });

        // Fetch order with items and variants
        await prisma.order.delete({
            where: { id },
        });

        // Restore stock for each product variant
        for (const item of order.items) {
            if (!item.variantId) continue;

            const variant = await prisma.variant.findUnique({
                where: { id: item.variantId },
                include: { product: true },
            });

            if (variant && variant.productId) {
                await prisma.product.update({
                    where: { id: variant.productId },
                    data: {
                        availableStock: {
                            increment: item.quantity,
                        },
                    },
                });
            }
        }

        return NextResponse.json({ message: "Order deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting order", error }, { status: 500 });
    }
}