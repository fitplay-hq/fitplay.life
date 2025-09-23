import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


// Add credits to multiple employees in a company
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN" || session.user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
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

// Get wallets of all employees in a company
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const isPersonal = searchParams.get("personal") === "true";

    if (isPersonal) {
      if (!["EMPLOYEE", "HR"].includes(session.user.role)) {
        return NextResponse.json(
          { message: "Unauthorized role for personal wallet" },
          { status: 401 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      let wallet = await prisma.wallet.findUnique({
        where: { userId: user.id },
      });

      if (!wallet) {
        wallet = await prisma.wallet.create({
          data: {
            userId: user.id,
            balance: 0,
            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          },
        });
      }

      const allTransactions = await prisma.transactionLedger.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      });

      const recentTransactions = allTransactions.slice(0, 10);

      const transactions = recentTransactions.map((tx) => ({
        id: tx.id,
        date: tx.createdAt.toISOString().split("T")[0],
        type: tx.isCredit ? "Credit" : "Purchase",
        amount: tx.isCredit ? tx.amount : -tx.amount,
        balance: wallet.balance, // Use current balance for simplicity
        description: tx.isCredit ? "Credits added by admin" : "Purchase made",
      }));

      // Compute creditsUsed as sum of debits
      const creditsUsed = allTransactions
        .filter((tx) => !tx.isCredit)
        .reduce((sum, tx) => sum + tx.amount, 0);

      return NextResponse.json({
        wallet: {
          balance: wallet.balance,
          expiryDate: wallet.expiryDate,
        },
        dashboardStats: {
          creditsRemaining: wallet.balance,
          creditsUsed,
        },
        walletHistory: transactions,
      });
    }

    // Existing company-wide logic
    let companyId: string | null = null;

    if (session.user.role === "ADMIN") {
      companyId = searchParams.get("companyId");
      if (!companyId) {
        return NextResponse.json(
          { error: "companyId is required for Admin" },
          { status: 400 }
        );
      }
    } else if (session.user.role === "HR") {
      const hrUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { companyId: true },
      });
      if (!hrUser) {
        return NextResponse.json({ error: "HR user not found" }, { status: 404 });
      }
      companyId = hrUser.companyId;
    } else {
      return NextResponse.json(
        { message: "Unauthorized role" },
        { status: 401 }
      );
    }

    const employees = await prisma.user.findMany({
      where: { companyId },
      include: { wallet: true },
    });

    if (!employees.length) {
      return NextResponse.json(
        { error: "No employees found for this company" },
        { status: 404 }
      );
    }

    const wallets = employees.map((emp) => ({
      email: emp.email,
      name: emp.name,
      balance: emp.wallet?.balance ?? 0,
      expiryDate: emp.wallet?.expiryDate ?? null,
    }));

    return NextResponse.json({ companyId, wallets });
  } catch (error) {
    console.error("Error fetching wallets:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}