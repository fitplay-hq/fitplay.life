import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token: String(token) },
  });

  if (!record || record.expires < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  if (!looksLikeEmail(record.identifier)) {
    return NextResponse.json({ error: "This is not an email verification token" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email: record.identifier },
    data: { verified: true },
  });

  await prisma.verificationToken.delete({ where: { token: String(token) } });

  return new NextResponse("✅ Account verified successfully! You can now log in.", { status: 200 });
}
