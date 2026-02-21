import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Optional: restrict to ADMIN only
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { companyId, Bundletoggle } = body;

    if (!companyId || typeof Bundletoggle !== "boolean") {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 }
      );
    }

    await prisma.company.update({
      where: { id: companyId },
      data: {
        hasWellnessStarterBundle: Bundletoggle,
      },
    });

    return NextResponse.json(
      { message: "Company Bundle Updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}