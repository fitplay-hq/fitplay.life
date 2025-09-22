import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyId, employeesEmailID, creditAmount } = body;

    if (!companyId || !employeesEmailID?.length || !creditAmount) {
      return NextResponse.json(
        { error: "companyId, employeesEmailID and creditAmount are required" },
        { status: 400 }
      );
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const employees = await prisma.user.findMany({
      where: {
        email: { in: employeesEmailID },
        companyId,
      },
      include: { wallet: true },
    });

    if (!employees.length) {
      return NextResponse.json({ error: "No employees found" }, { status: 404 });
    }

    const results = [];
    for (const emp of employees) {
      let wallet = emp.wallet;

      if (!wallet) {
        wallet = await prisma.wallet.create({
          data: {
            userId: emp.id,
            balance: 0,
            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          },
        });
      }

      const updatedWallet = await prisma.wallet.update({
        where: { id: wallet.id },
        data: { balance: wallet.balance + creditAmount },
      });

      await prisma.transactionLedger.create({
        data: {
          userId: emp.id,
          amount: creditAmount,
          modeOfPayment: "Credits",
          isCredit: true,
          walletId: wallet.id,
        },
      });

      results.push({
        email: emp.email,
        newBalance: updatedWallet.balance,
      });
    }

    return NextResponse.json({
      message: "Credits added successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error adding credits:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
