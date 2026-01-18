import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./client.js";
const adapter = new PrismaPg({
    connectionString: String(process.env.DATABASE_URL),
});
const prisma = new PrismaClient({ adapter });
async function main() {
    const lookupDayModifierData = 
    // Create DayModifiers
    await prisma.dayModifier.createMany({
        data: [
            { name: "standard" },
            { name: "overtime" },
            { name: "time-off" },
            { name: "sick-day" },
            { name: "vacation" },
        ],
        skipDuplicates: true,
    });
    console.log("Seeded DayModifiers");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map