import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import { addMinutes } from "date-fns";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) throw new Error("RESEND_API_KEY is not defined");
const resend = new Resend(resendApiKey);

export async function POST(req: NextRequest) {
  try {
    const { id, name, email, password, role, companyId, companyName, address, phone } = await req.json();

    if (!name || !email || !password || !role || !phone) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Validate email + password
    if (!validator.isEmail(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return NextResponse.json({ message: "Password is not strong enough" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    let finalCompanyId = companyId;

    if (role === "HR") {
      if (!companyName || !address) {
        return NextResponse.json({ message: "Company name and address are required for HR" }, { status: 400 });
      }

      const newCompany = await prisma.company.create({
        data: {
          name: companyName,
          address: address,
        },
      });

      finalCompanyId = newCompany.id;
    } else if (role === "EMPLOYEE") {
      if (!companyId) {
        return NextResponse.json({ message: "companyId is required for employee" }, { status: 400 });
      }

      const existingCompany = await prisma.company.findUnique({ where: { id: companyId } });
      if (!existingCompany) {
        return NextResponse.json({ message: "Company does not exist" }, { status: 400 });
      }
    }

    const newUser = await prisma.user.create({
      data: {
        id,
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role,
        companyId: finalCompanyId!,
        phone,
      },
    });

    const token = randomUUID();
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: addMinutes(new Date(), 30),
      },
    });

    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}`;
    const verificationMail = process.env.VERIFICATION_MAIL || "noreply@fitplaysolutions.com";

    await resend.emails.send({
      from: verificationMail,
      to: email,
      subject: "Verify your account",
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your account.</p>`,
    });

    return NextResponse.json({ user: newUser, verificationUrl }, { status: 201 });
  } catch (error) {
    console.error("Error during user signup:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
