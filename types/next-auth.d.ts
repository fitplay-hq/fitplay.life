import NextAuth, { DefaultSession } from "next-auth"
import { $Enums } from "@/app/generated/prisma"

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
    role: $Enums.Role
    passwordHash?: string
  }
}
