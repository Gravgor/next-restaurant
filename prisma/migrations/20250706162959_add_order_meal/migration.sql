/*
  Warnings:

  - You are about to drop the `_OrderMeal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderMeal" DROP CONSTRAINT "_OrderMeal_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderMeal" DROP CONSTRAINT "_OrderMeal_B_fkey";

-- DropTable
DROP TABLE "_OrderMeal";

-- CreateTable
CREATE TABLE "order_meals" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "mealId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_meals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_meals" ADD CONSTRAINT "order_meals_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_meals" ADD CONSTRAINT "order_meals_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
