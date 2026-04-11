// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Pool } = require("pg");
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@amorevet.com.br" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@amorevet.com.br",
      password,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin criado:", admin.email);
  console.log("📧 Email: admin@amorevet.com.br");
  console.log("🔑 Senha: admin123");
  console.log("⚠️  Troque a senha após o primeiro login!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
