import NextAuth, { DefaultSession } from "next-auth"
import { $Enums } from "@/lib/generated/prisma"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: $Enums.Role
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    name: string
    email: string
    role?: $Enums.Role  // Make role optional since admin won't have it
    password?: string
  }

  interface AdminUser {
    id: string
    name: string
    email: string
    password?: string
    role?: $Enums.Role.ADMIN
  }

  interface UserCredentials {
    email: string
    password: string
    isAdmin?: boolean  // To differentiate between admin and regular user login
  }
}
