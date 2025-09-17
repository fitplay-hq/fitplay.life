import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";

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

        const tokenRecord = await prisma.verificationToken.findUnique({
            where: { token },
        });

        if (!tokenRecord || tokenRecord.expires < new Date()) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 400 }
            );
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
                    gender,
                    birthDate: new Date(birthDate),
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
                    gender,
                    birthDate: new Date(birthDate),
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

        const verifyLink = `${process.env.FRONTEND_URL}/verify?token=${verifyToken}`;
        const verificationMail = process.env.VERIFICATION_MAIL || "noreply@fitplaysolutions.com";

        await resend.emails.send({
            from: verificationMail,
            to: email,
            subject: "Verify your account",
            html: `
            <p>Click <a href="${verifyLink}">here</a> to verify your account.</p>
            <p>This link will expire in 1 hour.</p>
            `,
        });

        return NextResponse.json({
            message: "Signup completed. Please verify your email in 1 hour.",
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
