import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) throw new Error("RESEND_API_KEY is not defined");
const resend = new Resend(resendApiKey);

// Generate a 6-digit numeric OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = session.user;
    if (!email) {
      return NextResponse.json(
        { error: "Email not found in session" },
        { status: 400 }
      );
    }

    // 1. Generate the OTP and Set Expiry (10 minutes from now)
    const otp = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 2. Create the unified token format to avoid constraint issues with random 6 digit numbers
    const uniqueTokenStr = `${email}-${otp}`;

    // 3. Clear any existing OTP tokens for this identifier
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // 4. Save the new token in the database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: uniqueTokenStr, // We store [email]-[otp]
        expires,
      },
    });

    // 5. Send the OTP email via Resend
    await resend.emails.send({
      from: "no-reply@fitplaysolutions.com",
      to: email,
      subject: "Your OTP for Checkout - FitPlay Solutions",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Checkout Verification</h2>
          <p>You requested to pay using your wallet credits. Please use the following One-Time Password (OTP) to complete your order:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h1 style="margin: 0; letter-spacing: 5px; color: #10B981;">${otp}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you did not request this, please ignore this email or contact support.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return NextResponse.json(
      { error: "Failed to generate OTP", details: (error as Error).message },
      { status: 500 }
    );
  }
}
