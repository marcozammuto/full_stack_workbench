import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.resolve("..", ".env"),
});
const adapter = new PrismaPg({
    connectionString: String(process.env.DATABASE_URL),
});
const prisma = new PrismaClient({ adapter });
export default prisma;
//# sourceMappingURL=db.js.map