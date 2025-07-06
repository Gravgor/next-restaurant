"use server";

import { prisma } from "@/config/prisma.config";
import { MealData } from "./create-order.types";
import { revalidatePath } from "next/cache";

export async function createOrderAction(meals: MealData[]) {
  const mealsData = await prisma.meal.findMany({
    where: {
      id: {
        in: meals.map(m => m.id)
      }
    }
  });

  const totalPrice = meals.reduce((total, mealOrder) => {
    const meal = mealsData.find(m => m.id === mealOrder.id);
    return total + (meal?.price || 0) * mealOrder.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      totalPrice,
      currency: mealsData[0]?.currency || "USD",
      meals: {
        create: meals.map((mealOrder) => ({
          quantity: mealOrder.quantity,
          meal: {
            connect: { id: mealOrder.id }
          }
        }))
      }
    },
    include: {
      meals: {
        include: {
          meal: true
        }
      }
    }
  });

  revalidatePath("/");
  return order;
}
