    import prisma from "@/lib/prisma";
    import { NextRequest, NextResponse } from "next/server";

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
            const newUser = await prisma.user.create({
                data: {
                    id,
                    name,
                    email,
                    password,
                    role,
                    companyId,
                    phone
                }
            });

            return NextResponse.json(newUser, { status: 201 });
        } catch (error) {
            console.error("Error during user signup:", error);
            return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
        }
    }