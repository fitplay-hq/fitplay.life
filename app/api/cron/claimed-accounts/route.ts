import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const secret = req.headers.get("CRON_SECRET");
    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Running claimed accounts cleanup cron job");
    console.log("Running claimed accounts cleanup cron job");
    console.log("Received secret:", secret ? "✅ present" : "❌ missing");
    console.log("DB URL:", process.env.DATABASE_URL ? "✅ set" : "❌ missing");

    // Deploy to see this automated job in action!

    // Calculate the cutoff time (24 hours ago)
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Delete users where claimed = false and createdAt < cutoff
    const deleted = await prisma.wallet.deleteMany({
        where: {
            user: {
                claimed: false,
                createdAt: { lt: cutoff },
            },
        },
    });

    const deletedUsers = await prisma.user.deleteMany({
        where: {
            claimed: false,
            createdAt: { lt: cutoff },
        },
    });

    return NextResponse.json({ message: `Deleted ${deleted.count} unclaimed users` });
}
