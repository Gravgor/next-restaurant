"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { CreateOrder } from "@/app/(main)/manager/create/create-order";
import { MealModel } from "@/models/meal.model";

type OrderManagerProps = {
  meals: MealModel[];
}

export function OrderManager({meals}:OrderManagerProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <div>
      <Button onClick={handleOpen}>Create order</Button>

      <CreateOrder open={open} onOpenChange={setOpen} meals={meals} />
    </div>
  );
}
