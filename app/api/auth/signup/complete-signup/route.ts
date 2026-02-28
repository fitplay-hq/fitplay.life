import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";
import { getVerificationEmailHtml } from "@/lib/email-templates";

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) throw new Error("RESEND_API_KEY is not defined");
const resend = new Resend(resendApiKey);

function looksLikeEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { token, name, email, password, phone, gender, birthDate } = body;

        // If no token, allow direct signup for normal users
        if (!token) {
            // Check if email already exists
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return NextResponse.json({ error: "This email is already registered. Please use a different email." }, { status: 400 });
            }
            // Check if phone already exists
            if (phone) {
                const existingPhone = await prisma.user.findFirst({ where: { phone } });
                if (existingPhone) {
                    return NextResponse.json({ error: "This phone number is already registered. Please use a different phone number." }, { status: 400 });
                }
            }
            const hashedPass = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPass,
                    phone,
                    gender,
                    birthDate,
                    role: "EMPLOYEE",
                    claimed: true,
                    verified: false,
                    hasPaidBundle: false,
                },
            });
            // Send verification email
            const verifyToken = crypto.randomUUID();
            await prisma.verificationToken.create({
                data: {
                    identifier: user.email,
                    token: verifyToken,
                    expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
                },
            });
            // ...send email logic (reuse below)

              const baseUrl = process.env.ENVIRONMENT !== "development" ? `https://fitplay.life` : 'http://localhost:3000';

        const verifyLink = `${baseUrl}/verify?token=${verifyToken}`;
        // Use Resend's verified domain for better delivery
        const verificationMail = "no-reply@fitplaysolutions.com";

        try {
            console.log(`🔧 Email configuration:`)
            console.log(`📧 From: ${verificationMail}`);
            console.log(`📧 To: ${email}`);
            console.log(`🔗 Verify Link: ${verifyLink}`);
            console.log(`🔑 Resend API Key exists: ${!!resendApiKey}`);

            const emailResult = await resend.emails.send({
                from: verificationMail,
                to: email,
                subject: "✅ Verify your FitPlay account - Action Required",
                html: getVerificationEmailHtml(name || "User", verifyLink),
            });
            console.log(`✅ Verification email sent successfully to ${email}. Email ID: ${emailResult.data?.id}`);
            console.log(`📧 From: ${verificationMail} | To: ${email}`);
        } catch (emailError) {
            console.error(`❌ Failed to send verification email to ${email}:`, emailError);
            console.error(`📧 Attempted from: ${verificationMail}`);
            // Don't fail the signup if email fails
        }
            // Return response
            return NextResponse.json({ message: "Signup completed. Please verify your email in 1 hour." });
        }

         const tokenRecord = await prisma.verificationToken.findUnique({
            where: { token },
        });

        if (!tokenRecord || tokenRecord.expires < new Date()) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 400 })}

        // Check if email already exists (for someone else)
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser && existingUser.email !== tokenRecord.identifier) {
            return NextResponse.json(
                { error: "This email is already registered. Please use a different email." },
                { status: 400 }
            );
        }

        // Check if phone already exists
        if (phone) {
            const existingPhone = await prisma.user.findFirst({
                where: { phone },
            });

            if (existingPhone) {
                return NextResponse.json(
                    { error: "This phone number is already registered. Please use a different phone number." },
                    { status: 400 }
                );
            }
        }

        const hashedPass = await bcrypt.hash(password, 10);

        let user;

        if (looksLikeEmail(tokenRecord.identifier)) {
            // -------- HR flow --------
            user = await prisma.user.update({
                where: { email: tokenRecord.identifier },
                data: {
                    name,
                    email,
                    password: hashedPass,
                    phone,
                    gender:null,
                    birthDate: null,

                    verified: false,
                    claimed: true,
                },
            });
        } else {
            // -------- Employee flow (claim logic) --------
            const companyId = tokenRecord.identifier;

            const unclaimed = await prisma.user.findFirst({
                where: {
                    companyId,
                    role: "EMPLOYEE",
                    claimed: false,
                },
            });

            if (!unclaimed) {
                return NextResponse.json(
                    { error: "All employee slots have been claimed" },
                    { status: 400 }
                );
            }

            user = await prisma.user.update({
                where: { id: unclaimed.id },
                data: {
                    name,
                    email,
                    password: hashedPass,
                    phone,
                    gender:null,
                    birthDate: null,
                    claimed: true,
                    verified: false,
                },
            });
        }

        // consume the signup token
        await prisma.verificationToken.delete({ where: { token } });

        // send verification mail
        const verifyToken = crypto.randomUUID();
        await prisma.verificationToken.create({
            data: {
                identifier: user.email,
                token: verifyToken,
                expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
            },
        });

        const baseUrl = process.env.ENVIRONMENT !== "development" ? `https://fitplay.life` : 'http://localhost:3000';

        const verifyLink = `${baseUrl}/verify?token=${verifyToken}`;
        // Use Resend's verified domain for better delivery
        const verificationMail = "no-reply@fitplaysolutions.com";

        try {
            console.log(`🔧 Email configuration:`)
            console.log(`📧 From: ${verificationMail}`);
            console.log(`📧 To: ${email}`);
            console.log(`🔗 Verify Link: ${verifyLink}`);
            console.log(`🔑 Resend API Key exists: ${!!resendApiKey}`);

            const emailResult = await resend.emails.send({
                from: verificationMail,
                to: email,
                subject: "✅ Verify your FitPlay account - Action Required",
                html: getVerificationEmailHtml(name || "User", verifyLink),
            });
            console.log(`✅ Verification email sent successfully to ${email}. Email ID: ${emailResult.data?.id}`);
            console.log(`📧 From: ${verificationMail} | To: ${email}`);
        } catch (emailError) {
            console.error(`❌ Failed to send verification email to ${email}:`, emailError);
            console.error(`📧 Attempted from: ${verificationMail}`);
            // Don't fail the signup if email fails
        } return NextResponse.json({
            message: "Signup completed. Please verify your email in 1 hour.",
        });
    } catch (err: any) {
        console.error("Signup error:", err);

        // Handle Prisma unique constraint violations
        if (err.code === 'P2002') {
            const target = err.meta?.target;
            if (target?.includes('email')) {
                return NextResponse.json(
                    { error: "This email is already registered." },
                    { status: 400 }
                );
            }
            if (target?.includes('phone')) {
                return NextResponse.json(
                    { error: "This phone number is already registered." },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { error: "A user with this information already exists." },
                { status: 400 }
            );
        }

        // Handle other Prisma errors
        if (err.code?.startsWith('P')) {
            return NextResponse.json(
                { error: "Database error occurred. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
