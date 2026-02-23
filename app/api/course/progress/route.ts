import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const progress = await prisma.wellnessCourseProgress.findUnique({
    where: { userId: session.user.id },
  });

  if (!progress || !progress.isEnrolled) {
    return NextResponse.json({ isEnrolled: false });
  }

  const totalModules = 9; // your fixed total

  const progressPercentage =
    (progress.completedModules.length / totalModules) * 100;

  return NextResponse.json({
    isEnrolled: true,
    completedModules: progress.completedModules,
    currentSection: progress.currentSection,
    currentModule: progress.currentModule,
    progressPercentage: Math.round(progressPercentage),
  });
}