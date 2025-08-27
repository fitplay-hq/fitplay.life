// scripts/hash-admin-password.ts
import bcrypt from "bcryptjs";

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log("Admin password hash:", hash);
}

hashPassword("AdminFitplay@1908");

