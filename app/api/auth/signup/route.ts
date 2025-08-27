import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator"
import { addMinutes } from "date-fns";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { id, name, email, password, role, companyId, phone } = await req.json();

        if (!name || !email || !password || !role || !companyId || !phone) {
            return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return new NextResponse(JSON.stringify({ message: "User already exists" }), { status: 400 });
        }

        const isValidEmail = validator.isEmail(email);
        if (!isValidEmail) {
            return new NextResponse(JSON.stringify({ message: "Invalid email format" }), { status: 400 });
        }

        const isStrongPassword = validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        });

        if (!isStrongPassword) {
            return new NextResponse(JSON.stringify({ message: "Password is not strong enough" }), { status: 400 });
        }

        const newUser = await prisma.user.create({
            data: {
                id,
                name,
                email,
                password: await bcrypt.hash(password, 10),
                role,
                companyId,
                phone
            }
        });

        const token = randomUUID();
        await prisma.verificationToken.create({
            data: {
                identifier: email,
                token,
                expires: addMinutes(new Date(), 30), // expires in 30min
            },
        });

        const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your account",
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your account.</p>`,
        });

        return NextResponse.json({ user: newUser, verificationUrl }, { status: 201 });
    } catch (error) {
        console.error("Error during user signup:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}