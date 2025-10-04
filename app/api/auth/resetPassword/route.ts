import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import bcrypt from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY);
function looksLikeEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Store request counts temporarily (IP → timestamps)
const rateLimitMap = new Map<string, number[]>();

// Settings
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;      // max 5 per minute per IP

function rateLimit(ip: string): boolean {
    const now = Date.now();
    const windowStart = now - WINDOW_MS;

    const timestamps = rateLimitMap.get(ip) || [];
    const filtered = timestamps.filter(ts => ts > windowStart);
    filtered.push(now);

    rateLimitMap.set(ip, filtered);

    return filtered.length <= MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        if (!rateLimit(ip)) {
            return NextResponse.json({ error: "Too many requests, try again later" }, { status: 429 });
        }
        const { email } = await req.json();
        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        // Check if user exists in User, Admin, or Vendor table
        const [user, admin, vendor] = await Promise.all([
            prisma.user.findUnique({ where: { email } }),
            prisma.admin.findUnique({ where: { email } }),
            prisma.vendor.findUnique({ where: { email } }),
        ]);

        const account = user || admin || vendor;
        if (!account) {
            return NextResponse.json({ error: "No account found with this email" }, { status: 404 });
        }

        // Generate secure token and expiry
        const resetToken = crypto.randomUUID();
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        // Store in VerificationToken table (reuse for reset)
        await prisma.verificationToken.create({
            data: {
                identifier: email,
                token: resetToken,
                expires: resetTokenExpiry,
            },
        });

        const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
        // Send reset password email
        const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
        await resend.emails.send({
            from: "noreply@fitplaysolutions.com",
            to: email,
            subject: "Reset your password",
            html: `
        <p>Hello,</p>
        <p>Click the link below to reset your password. This link is valid for 1 hour:</p>
        <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
        });

        return NextResponse.json({ message: "Reset link sent successfully" });
    } catch (error) {
        console.error("[RESET_PASSWORD_ERROR]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { token, newPassword } = await req.json();
        if (!token || typeof token !== "string") {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        if (!newPassword || typeof newPassword !== "string" || newPassword.length < 8) {
            return NextResponse.json({ error: "Invalid or weak new password" }, { status: 400 });
        }

        const record = await prisma.verificationToken.findUnique({
            where: { token: String(token) },
        });

        if (!record || record.expires < new Date()) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        if (!looksLikeEmail(record.identifier)) {
            return NextResponse.json({ error: "This is not a password reset token" }, { status: 400 });
        }

        const hashedPass = await bcrypt.hash(newPassword, 10);

        // Update password in the appropriate table
        const user = await prisma.user.findUnique({ where: { email: record.identifier } });
        if (user) {
            await prisma.user.update({
                where: { email: record.identifier },
                data: { password: hashedPass },
            });
        } else {
            const admin = await prisma.admin.findUnique({ where: { email: record.identifier } });
            if (admin) {
                await prisma.admin.update({
                    where: { email: record.identifier },
                    data: { password: hashedPass },
                });
            } else {
                const vendor = await prisma.vendor.findUnique({ where: { email: record.identifier } });
                if (vendor) {
                    await prisma.vendor.update({
                        where: { email: record.identifier },
                        data: { password: hashedPass },
                    });
                } else {
                    return NextResponse.json({ error: "No account found with this email" }, { status: 404 });
                }
            }
        }

        // Delete the used token
        await prisma.verificationToken.delete({ where: { token: String(token) } });

        return NextResponse.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("[RESET_PASSWORD_ERROR]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}