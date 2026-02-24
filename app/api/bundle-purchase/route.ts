import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { wallet: true },
    });

    if (!user || !user.wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    if (user.hasPaidBundle) {
      return NextResponse.json({ error: "Bundle already purchased" }, { status: 400 });
    }

    const BUNDLE_COST = 299;

    if (user.wallet.balance < BUNDLE_COST) {
      return NextResponse.json({ error: "Insufficient credits" }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      // 1️⃣ Deduct credits
      const updatedWallet = await tx.wallet.update({
        where: { id: user.wallet!.id },
        data: {
          balance: { decrement: BUNDLE_COST },
        },
      });

      // 2️⃣ Create ledger entry
      await tx.transactionLedger.create({
        data: {
          userId: user.id,
          walletId: updatedWallet.id,
          amount: BUNDLE_COST,
          modeOfPayment: "Credits",
          isCredit: false,
          transactionType: "BUNDLE_PURCHASE",
          balanceAfterTxn: updatedWallet.balance,
          remark: "Bundle purchased using credits",
           isDemo: user.isDemo,
        },
      });

      // 3️⃣ Mark bundle access
      await tx.user.update({
        where: { id: user.id },
        data: { hasPaidBundle: true },
      });
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: "Bundle purchase failed" },
      { status: 500 }
    );
  }
}