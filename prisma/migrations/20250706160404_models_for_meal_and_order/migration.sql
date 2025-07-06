-- CreateTable
CREATE TABLE "meals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalPrice" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderMeal" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OrderMeal_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderMeal_B_index" ON "_OrderMeal"("B");

-- AddForeignKey
ALTER TABLE "_OrderMeal" ADD CONSTRAINT "_OrderMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderMeal" ADD CONSTRAINT "_OrderMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
