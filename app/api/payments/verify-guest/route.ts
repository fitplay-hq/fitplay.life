import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, name, email, password, phone } = body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing Razorpay fields" }, { status: 400 });
    }

    // 1️⃣ VERIFY SIGNATURE
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });
    }

    // 2️⃣ VERIFY PAYMENT STATUS WITH RAZORPAY
    const keyId = process.env.RAZORPAY_KEY_ID!;
    const keySecret = process.env.RAZORPAY_KEY_SECRET!;
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const paymentCheck = await fetch(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
      method: "GET",
      headers: { Authorization: `Basic ${auth}` },
    });

    const paymentData = await paymentCheck.json();
    if (paymentData.status !== "captured") {
      return NextResponse.json({ error: "Payment not captured", status: paymentData.status }, { status: 400 });
    }

    // 3️⃣ FETCH cashPayment record
    const cash = await prisma.cashPayment.findUnique({ where: { razorpayOrderId: razorpay_order_id } });
    if (!cash) {
      return NextResponse.json({ error: "CashPayment record not found" }, { status: 404 });
    }

    if (cash.paymentStatus === "paid") {
      return NextResponse.json({ success: true, message: "Already verified" });
    }

    // 4️⃣ Ensure email not already registered
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    // 5️⃣ Perform DB updates atomically: create user, create wallet, update cash payment, and create ledger entry
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashed,
          phone,
          role: "EMPLOYEE",
          verified: true,
          claimed: true,
        },
      });

      const wallet = await tx.wallet.create({
        data: {
          userId: user.id,
          balance: 0,
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
      });

      await tx.cashPayment.update({
        where: { id: cash.id },
        data: { paymentStatus: "paid", razorpayPaymentId: razorpay_payment_id },
      });

      // Create a transaction ledger entry to record this paid signup (INR payment)
      const ledger = await tx.transactionLedger.create({
        data: {
          userId: user.id,
          amount: 0, // no credits awarded for signup
          modeOfPayment: "Cash",
          isCredit: false,
          cashAmount: Math.round((cash.amount || 0) / 100),
          balanceAfterTxn: wallet.balance,
          transactionType: "PURCHASE",
          walletId: wallet.id,
          remark: `Paid signup - razorpayOrder:${razorpay_order_id}`,
        },
      });

      return { userId: user.id, ledgerId: ledger.id };
    });

    return NextResponse.json({ success: true, message: "User created. Please log in.", userId: result.userId });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
  }
}
