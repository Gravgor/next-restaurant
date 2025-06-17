import React from "react";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateOrderValue } from "./create-order.types";
import { MealModel } from "@/models/meal.model";

type CreateOrderProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  meals: MealModel[];
};

const initialValues: CreateOrderValue = {
  meals: [],
};

const schema = z.object({});

export function CreateOrder({ open, onOpenChange, meals }: CreateOrderProps) {
  const onSubmit = async (values: CreateOrderValue) => {};

  const handleNewMeal = () => {
    // TODO: add new meal
  };

  const handleMealRemove = (index: number) => () => {
    // TODO: remove meal
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-0">
          <DialogTitle className="text-md">Create an order</DialogTitle>
          <DialogDescription className="text-xs">
            Select a meals you want to add to your order
          </DialogDescription>
        </DialogHeader>

        <form>
          <Button
            type="button"
            variant="secondary"
            onClick={handleNewMeal}
            className="my-6"
            size="sm"
          >
            Add another meal
          </Button>

          <div className="flex items-center justify-end">
            <Button type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
