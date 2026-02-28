import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { getVerificationEmailHtml } from "@/lib/email-templates";

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) throw new Error("RESEND_API_KEY is not defined");
const resend = new Resend(resendApiKey);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Check if user exists and is not verified
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        if (user.verified) {
            return NextResponse.json(
                { error: "Email is already verified" },
                { status: 400 }
            );
        }

        // Delete existing verification tokens for this user
        await prisma.verificationToken.deleteMany({
            where: { identifier: email }
        });

        // Generate new verification token
        const verifyToken = crypto.randomUUID();
        await prisma.verificationToken.create({
            data: {
                identifier: email,
                token: verifyToken,
                expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
            },
        });

        const baseUrl = process.env.ENVIRONMENT !== "development" ? `https://fitplay.life` : 'http://localhost:3000';
        const verifyLink = `${baseUrl}/verify?token=${verifyToken}`;
        const verificationMail = process.env.VERIFICATION_MAIL || "no-reply@fitplaysolutions.com";

        try {
            const result = await resend.emails.send({
                from: verificationMail,
                to: email,
                subject: "🔄 FitPlay Account Verification - Resent",
                html: getVerificationEmailHtml(user.name || "User", verifyLink),
            });

            console.log(`🔄 Verification email resent to ${email}. Email ID: ${result.data?.id}`);

            return NextResponse.json({
                message: "Verification email has been resent successfully",
                emailId: result.data?.id
            });

        } catch (emailError) {
            console.error("❌ Failed to resend verification email:", emailError);
            return NextResponse.json(
                { error: "Failed to send verification email" },
                { status: 500 }
            );
        }

    } catch (err) {
        console.error("❌ Resend verification error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}