import { compare } from "bcryptjs";

import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma";
import { $Enums } from "@/lib/generated/prisma";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

type UserRole = $Enums.Role;

export const authOptions: NextAuthOptions = {
  providers: [
    // For hr/employee
    CredentialsProvider({
      id: "users",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),

    // Admin login provider
    CredentialsProvider({
      id: "admin",
      name: "Admin",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter admin email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter admin password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        if (credentials.email !== process.env.ADMIN_EMAIL) {
          throw new Error("Unauthorized admin email");
        }

        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          throw new Error("No admin found");
        }

        const isValid = await compare(credentials.password, admin.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        console.log("Admin logged in:", admin.email);
        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: $Enums.Role.ADMIN,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: token.role as UserRole,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};

export const getServerAuthSession = (
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) => getServerSession(...args, authOptions);
