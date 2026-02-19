import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.company.delete({
      where: { id: params.id },
     
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request ,{ params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const {name,address} = await req.json();
        if (!name || !address) {
            return NextResponse.json({ error: "Name and address are required" }, { status: 400 });
        }
        
        await prisma.company.update({
            where: { id: params.id },
            data: { name, address }
        });

        return NextResponse.json({ success: true });
      } catch (error) {
        console.error("Failed to update company:", error);
        return NextResponse.json({ error: "Failed to update company" }, { status: 500 });
    }
  }
