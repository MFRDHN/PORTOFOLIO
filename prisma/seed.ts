import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import path from "path"
import { createHmac } from "crypto"

const dbPath = path.resolve(process.cwd(), "dev.db")
const adapter = new PrismaBetterSqlite3({ url: dbPath })
const prisma = new PrismaClient({ adapter })

const SECRET = process.env.ADMIN_SECRET || "portfolio-secret-key"
const password = process.env.ADMIN_PASSWORD || "admin123"
const hash = createHmac("sha256", SECRET).update(password).digest("hex")

async function main() {
  const existing = await prisma.admin.findUnique({
    where: { username: "admin" },
  })

  if (!existing) {
    await prisma.admin.create({
      data: { username: "admin", password: hash },
    })
    console.log(`Admin created: admin / ${password}`)
  } else {
    await prisma.admin.update({
      where: { username: "admin" },
      data: { password: hash },
    })
    console.log(`Password updated: admin / ${password}`)
  }
}

main()
  .catch((e) => {
    console.error(e.message || e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
