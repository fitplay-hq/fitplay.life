import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get all users with their wallets and companies
    const users = await prisma.user.findMany({
      include: {
        wallet: true,
        company: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get stats
    const stats = {
      total: users.length,
      hr: users.filter(user => user.role === "HR").length,
      employees: users.filter(user => user.role === "EMPLOYEE").length,
      verified: users.filter(user => user.verified).length,
    };

    return NextResponse.json({
      users,
      stats,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}