export type MealData = {
  id: number;
  quantity: number;
};

export type CreateOrderValue = {
  meals: MealData[];
};
