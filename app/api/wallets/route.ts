import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) throw new Error("RESEND_API_KEY is not defined");
const resend = new Resend(resendApiKey);


// Add credits to multiple employees in a company
export async function POST(req: NextRequest) {
    try {
        let companyId: string | null = null;
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        if (session.user.role !== "ADMIN" && session.user.role !== "HR") {
            return NextResponse.json({ message: "Only super admin can add credits to multiple employees" }, { status: 401 });
        }
        const body = await req.json();
        const {employeesEmailID, creditAmount } = body;

        if (!companyId || !employeesEmailID?.length || !creditAmount) {
            return NextResponse.json(
                { error: "companyId, employeesEmailID and creditAmount are required" },
                { status: 400 }
            );
        }

        if (session.user.role === "HR") {
            const hrUser = await prisma.user.findUnique({
                where: { email: session.user.email },
                select: { companyId: true },
            });
            if (!hrUser || hrUser.companyId !== companyId) {
              return NextResponse.json({ error: "Unauthorized for this company" }, { status: 401 });
            }
            companyId = hrUser?.companyId;
        }else {
            companyId = body.companyId;
        }

        if (!companyId) {
            return NextResponse.json({ error: "companyId not found" }, { status: 400 });
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
                    transactionType: "CREDIT",
                    walletId: wallet.id,
                },
            });

            results.push({
                email: emp.email,
                newBalance: updatedWallet.balance,
            });
        }

        for (const emp of employeesEmailID) {
            await resend.emails.send({
                from: "no-reply@fitplaysolutions.com",
                to: emp,
                subject: "Wallet Credits Added",
                html: `<p>Your wallet has been credited with ${creditAmount} credits.</p>`,
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
  
  // Update single user wallet (add credits)
  export async function PATCH(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      if (!session || (session.user.role !== "ADMIN" && session.user.role !== "HR") || session.user.email !== process.env.ADMIN_EMAIL) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const body = await req.json();
      const { userId, creditAmount } = body;
  
      if (!userId || typeof creditAmount !== "number") {
        return NextResponse.json(
          { error: "userId and creditAmount are required" },
          { status: 400 }
        );
      }
  
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { wallet: true },
      });
  
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      let wallet = user.wallet;
  
      if (!wallet) {
        wallet = await prisma.wallet.create({
          data: {
            userId: user.id,
            balance: 0,
            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          },
        });
      }
  
      const newBalance = wallet.balance + creditAmount;
      if (newBalance < 0) {
        return NextResponse.json(
          { error: "Cannot deduct more credits than available balance" },
          { status: 400 }
        );
      }
  
      const updatedWallet = await prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: newBalance,
          // Optionally update expiry if needed, but for now just balance
        },
      });
  
      await prisma.transactionLedger.create({
        data: {
          userId: user.id,
          amount: Math.abs(creditAmount),
          modeOfPayment: "Credits",
          isCredit: creditAmount > 0,
          transactionType: "CREDIT",
          walletId: wallet.id,
          cashAmount: 0,
        },
      });

      await resend.emails.send({
        from: "no-reply@fitplaysolutions.com",
        to: user.email,
        subject: "Wallet Updated Successfully",
        html: `<p>Credits have been added to your wallet successfully. New balance: ${updatedWallet.balance} credits.</p>`,
      });

      return NextResponse.json({
        message: "Wallet updated successfully",
        data: {
          userEmail: user.email,
          newBalance: updatedWallet.balance,
        },
      });
    } catch (error) {
      console.error("Error updating wallet:", error);
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
      if (!["EMPLOYEE", "VENDOR", "HR"].includes(session.user.role)) {
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
        type: tx.transactionType,
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
        // For admin without companyId, fetch all users
        const allEmployees = await prisma.user.findMany({
          where: { role: { in: ["HR", "EMPLOYEE"] } },
          include: { wallet: true, company: true },
        });

        if (!allEmployees.length) {
          return NextResponse.json(
            { error: "No employees found" },
            { status: 404 }
          );
        }

        const wallets = allEmployees.map((emp) => ({
          id: emp.id,
          email: emp.email,
          name: emp.name,
          role: emp.role,
          company: emp.company?.name || 'No Company',
          balance: emp.wallet?.balance ?? 0,
          expiryDate: emp.wallet?.expiryDate ?? null,
        }));

        return NextResponse.json({ allUsers: true, wallets });
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