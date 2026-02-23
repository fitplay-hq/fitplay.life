import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { moduleId, currentSection, currentModule } = await req.json();

  const progress = await prisma.wellnessCourseProgress.findUnique({
    where: { userId: session.user.id },
  });

  if (!progress) {
    return NextResponse.json({ error: "Not enrolled" }, { status: 400 });
  }

  const updatedModules = [
    ...new Set([...progress.completedModules, moduleId]),
  ];

  const totalModules = 9;
  const isCompleted = updatedModules.length === totalModules;

  await prisma.wellnessCourseProgress.update({
    where: { userId: session.user.id },
    data: {
      completedModules: updatedModules,
      currentSection,
      currentModule,
      completedAt: isCompleted ? new Date() : null,
    },
  });

  return NextResponse.json({ success: true });
}