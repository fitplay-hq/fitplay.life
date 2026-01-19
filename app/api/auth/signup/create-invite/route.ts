import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, companyAddress, role, employeeCount } = body;

    const session = await getServerSession(authOptions);
    if (!session || !["ADMIN", "HR"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!["HR", "EMPLOYEE"].includes(role))
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });

    let companyId: string;

    if (role === "HR") {
      if (session.user.role !== "ADMIN") {
        return NextResponse.json(
          { error: "Only ADMIN can create HR accounts" },
          { status: 403 }
        );
      }
      const company = await prisma.company.create({
        data: { name: companyName, address: companyAddress },
      });
      companyId = company.id;
    } else {
      const company = await prisma.company.findFirst({
        where: { name: companyName },
      });
      if (!company) {
        return NextResponse.json(
          { error: "Company does not exist for EMPLOYEE" },
          { status: 400 }
        );
      }
      companyId = company.id;
    }

    // ───────────────────────────────
    // Create HR or multiple temp EMPLOYEEs
    // ───────────────────────────────
    if (role === "HR") {
      if (session.user.role !== "ADMIN") {
        return NextResponse.json(
          { error: "Only ADMIN can create HR accounts" },
          { status: 403 }
        );
      }
      const tempEmail = `temp_${Date.now()}@example.com`;
      const tempPhone = `${Date.now()}`;
      const user = await prisma.user.create({
        data: {
          name: "Temp HR",
          email: tempEmail,
          password: "TEMP_PASSWORD",
          phone: tempPhone,
          role,
          companyId,
          verified: false,
        },
      });

      await prisma.wallet.create({
        data: {
          userId: user.id,
          balance: 0,
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
      });

      const signupToken = randomUUID();
      await prisma.verificationToken.create({
        data: {
          identifier: user.email,
          token: signupToken,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7), // 7 days for HR
        },
      });

      const baseUrl = process.env.ENVIRONMENT !== "development" ? `https://fitplay.life` : 'http://localhost:3000';

      const signupLink = `${baseUrl}/signup?token=${signupToken}`;
      return NextResponse.json({ signupLink });
    } else {
      if (session.user.role === "HR") {
        const userId = session.user.id;
        const data = await prisma.user.findUnique({
          where: { id: userId },
          select: { companyId: true },
        });
        if (!data?.companyId) {
          return NextResponse.json(
            { error: "HR user does not have a companyId" },
            { status: 400 }
          );
        }
        companyId = data?.companyId;
      }
      if (!employeeCount || employeeCount < 1)
        return NextResponse.json(
          { error: "employeeCount is required and must be > 0" },
          { status: 400 }
        );

      for (let i = 0; i < employeeCount; i++) {
        const tempEmail = `temp_${Date.now()}_${i}@example.com`;
        const tempPhone = `${Date.now()}_${i}`;
        const user = await prisma.user.create({
          data: {
            name: `Temp Employee ${i + 1}`,
            email: tempEmail,
            password: "TEMP_PASSWORD",
            phone: tempPhone,
            role: "EMPLOYEE",
            companyId,
            verified: false,
            claimed: false, // <── New field in your schema
          },
        });

        await prisma.wallet.create({
          data: {
            userId: user.id,
            balance: 0,
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          },
        });
      }

      // Create ONE shared token for all employees
      const signupToken = randomUUID();
      await prisma.verificationToken.create({
        data: {
          identifier: companyId,
          token: signupToken,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7), // 7 days for employees
        },
      });

      const baseUrl = process.env.ENVIRONMENT !== "development" ? `https://fitplay.life` : 'http://localhost:3000';
      const signupLink = `${baseUrl}/signup?token=${signupToken}`;
      return NextResponse.json({ signupLink });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
