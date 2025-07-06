import React from "react";

import { OrderManager } from "@/app/(main)/manager/order-manager";
import { prisma } from "@/config/prisma.config";

export async function MainPage() {
  const orders = await prisma.order.findMany({
    include: {
      meals: {
        include: {
          meal: true,
        },
      },
    },
  });
  const meals = await prisma.meal.findMany();

  return (
    <div className="min-h-screen p-12">
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-black text-xl">Orders</h1>
        <OrderManager meals={meals} />
      </header>

      <div className="flex flex-col gap-4">
        {orders.length > 0 ? orders.map((order, index) => {
          const totalPrice = order.meals.reduce((acc, meal) => acc + meal.meal.price * meal.quantity, 0);

          return (
            <div key={index} className="border rounded-md p-6">
              <div className="flex justify-between">
                <span>Order #{order.id}</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>

              <div className="mt-4">
                {order.meals.map((meal) => (
                  <div key={meal.id}>{meal.meal.name} x {meal.quantity}</div>
                ))}

                <div className="w-full flex justify-end">
                  <span>Total price: {totalPrice} {order.currency}</span>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="text-center text-gray-500">No orders found</div>
        )}
      </div>
    </div>
  );
}
