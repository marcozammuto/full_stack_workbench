import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { readFile } from "fs/promises"; // ← Add /promises
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve("..", ".env") });

const adapter = new PrismaPg({
  connectionString: String(process.env.DATABASE_URL),
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const lookupPath = path.resolve("..", "lookup", "dayModifiers.json");

  const data = await readFile(lookupPath, "utf8");
  const lookupData = JSON.parse(data);

  if (lookupData.length === 0) {
    throw new Error("Empty lookup data");
  }

  // Create DayModifiers
  await prisma.dayModifier.createMany({
    data: lookupData,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
