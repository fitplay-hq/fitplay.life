import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse(JSON.stringify({ error: "Invalid token" }), { status: 400 });
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token: String(token) },
  });

  if (!record) {
    return new NextResponse(JSON.stringify({ error: "Invalid or expired token" }), { status: 400 });
  }

  if (record.expires < new Date()) {
    return new NextResponse(JSON.stringify({ error: "Token expired" }), { status: 400 });
  }

  await prisma.user.update({
    where: { email: record.identifier },
    data: { verified: true },
  });

  await prisma.verificationToken.delete({ where: { token: String(token) } });

  return new NextResponse("✅ Account verified successfully! You can now log in.", { status: 200 });
}
