
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.wellnessCourseProgress.findUnique({
    where: { userId: session.user.id },
  });

  if (existing) {
    return NextResponse.json({ success: true });
  }

  await prisma.wellnessCourseProgress.create({
    data: {
      userId: session.user.id,
      isEnrolled: true,
      enrolledAt: new Date(),
    },
  });

  return NextResponse.json({ success: true });
}