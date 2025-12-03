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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, email, phone, password, role, companyId, gender, address } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !password || !role || !companyId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or phone already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role,
        companyId,
        gender: gender || null,
        address: address || null,
        verified: true, // Admin-created users are automatically verified
      },
      include: {
        company: {
          select: {
            name: true,
          },
        },
      },
    });

    // Create wallet for the user
    await prisma.wallet.create({
      data: {
        userId: newUser.id,
        balance: 0,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      },
    });

    // Fetch user with wallet included
    const userWithWallet = await prisma.user.findUnique({
      where: { id: newUser.id },
      include: {
        wallet: true,
        company: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user: userWithWallet,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}