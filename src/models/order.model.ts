import { MealModel } from "@/models/meal.model";

export type OrderMealModel = {
  id: number;
  orderId: number;
  mealId: number;
  quantity: number;
  meal: MealModel;
};

export type OrderModel = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  meals: OrderMealModel[];
  totalPrice: number;
  currency: string;
};
