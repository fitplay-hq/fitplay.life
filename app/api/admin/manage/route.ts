import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  });

  const totalAdmins = await prisma.admin.count();

  return NextResponse.json({
    admins,
    total: totalAdmins
  });
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


  const body = await req.json();
  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  return NextResponse.json(admin);
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const { id } = await req.json();

  await prisma.admin.delete({
    where: { id }
  });

  return NextResponse.json({ success: true });
}