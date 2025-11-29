import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    console.log(`🔍 Verification attempt for token: ${token?.slice(0, 8)}...`);

    if (!token) {
      console.log("❌ No token provided");
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const record = await prisma.verificationToken.findUnique({
      where: { token: String(token) },
    });

    console.log(`📋 Token record found:`, {
      exists: !!record,
      identifier: record?.identifier,
      expires: record?.expires,
      isExpired: record ? record.expires < new Date() : null
    });

    if (!record) {
      console.log("❌ Token not found in database");
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    if (record.expires < new Date()) {
      console.log(`❌ Token expired: ${record.expires} < ${new Date()}`);
      await prisma.verificationToken.delete({ where: { token: String(token) } });
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    if (!looksLikeEmail(record.identifier)) {
      console.log(`❌ Not an email verification token: ${record.identifier}`);
      return NextResponse.json({ error: "This is not an email verification token" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: record.identifier },
    });

    if (!user) {
      console.log(`❌ User not found for email: ${record.identifier}`);
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    if (user.verified) {
      console.log(`✅ User already verified: ${record.identifier}`);
      await prisma.verificationToken.delete({ where: { token: String(token) } });
      return NextResponse.json({ message: "Email already verified", alreadyVerified: true });
    }

    // Update user as verified
    await prisma.user.update({
      where: { email: record.identifier },
      data: { verified: true },
    });

    // Delete the used token
    await prisma.verificationToken.delete({ where: { token: String(token) } });

    console.log(`✅ Email verified successfully for: ${record.identifier}`);
    return NextResponse.json({ message: "Email verified successfully", verified: true });
  } catch (err) {
    console.error("🔥 Verification error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
