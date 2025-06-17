"use server";

import { prisma } from "@/config/prisma.config";
import { MealData } from "./create-order.types";

export async function createOrderAction(meals: MealData[]) {
  // TODO: create order
}
