import { MealModel } from "@/models/meal.model";

export type OrderModel = {
  id: number;
  createdAt: string;
  meals: MealModel[];
};
