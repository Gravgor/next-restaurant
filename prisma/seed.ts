import { prisma } from "../src/config/prisma.config";

// TODO: seed meals
const meals = [];

async function main() {
  await prisma.meal.createMany({
    data: meals,
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
