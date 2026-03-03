import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userIdParam = searchParams.get("userId");
    const showDemoOnly = searchParams.get("demoOnly") === "true";

    const whereClause: any = {};

 
   if (session.user.role === "ADMIN" || session.user.role === "HR") {
  // Admin/HR can see ALL orders
  // If userId is provided, filter by that specific user
  if (userIdParam) {
    whereClause.userId = userIdParam;
  }
} else {
  // Regular users can only see their own orders
  whereClause.userId = session.user.id;
}


  if (session.user.role === "ADMIN" || session.user.role === "HR") {
  if (userIdParam) {
    whereClause.userId = userIdParam;
  }
} else {
  whereClause.userId = session.user.id;
}

// Demo filtering

if (session.user.role === "ADMIN" || session.user.role === "HR") {
  whereClause.isDemoOrder = showDemoOnly ? true : false;
} else {
  console.log("User is regular user. Filtering orders by demo status based on user role.");
  console.log("Session user info:", session.user);
  if (session.user.isDemo) {
    whereClause.isDemoOrder = true;
  } else {
    whereClause.isDemoOrder = false;
  }
}
    // ✅ THIS WAS MISSING IN YOUR FILE
    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const sanitizedOrders =
      session.user.role === "ADMIN"
        ? orders
        : orders.map(({ remarks, ...rest }) => rest);

    return NextResponse.json({ orders: sanitizedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
