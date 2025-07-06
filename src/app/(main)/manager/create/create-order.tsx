import React from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MealModel } from "@/models/meal.model";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createOrderAction } from "./create-order.actions";

type CreateOrderProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  meals: MealModel[];
};

const schema = z.object({
  meals: z.array(z.object({
    id: z.number().min(1, "Please select a meal"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
  })).min(1, "Please add at least one meal"),
});

type FormValues = z.infer<typeof schema>;

const createOrderValue: FormValues = {
  meals: [],
};

export function CreateOrder({ open, onOpenChange, meals }: CreateOrderProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: createOrderValue,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "meals",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await createOrderAction(values.meals);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      form.setError("root", {
        type: "submit",
        message: "Failed to create order. Please try again.",
      });
    }
  };

  const handleNewMeal = () => {
    append({ id: 0, quantity: 1 });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-0">
          <DialogTitle className="text-md">Create an order</DialogTitle>
          <DialogDescription className="text-xs">
            Select meals you want to add to your order
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2">
                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name={`meals.${index}.id`}
                    render={({ field: selectField }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select
                            value={selectField.value ? selectField.value.toString() : undefined}
                            onValueChange={(value) => selectField.onChange(parseInt(value, 10))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a meal" />
                            </SelectTrigger>
                            <SelectContent>
                              {meals.map((meal) => (
                                <SelectItem key={meal.id} value={meal.id.toString()}>
                                  {meal.name} - {meal.currency} {meal.price}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`meals.${index}.quantity`}
                    render={({ field: quantityField }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            type="number"
                            onChange={(e) => quantityField.onChange(parseInt(e.target.value, 10))}
                            value={quantityField.value}
                            min={1}
                            className="w-20 px-2 py-1 border rounded"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            {form.formState.errors.meals?.root && (
              <p className="text-sm text-red-500">{form.formState.errors.meals.root.message}</p>
            )}

            {form.formState.errors.root && (
              <p className="text-sm text-red-500">{form.formState.errors.root.message}</p>
            )}

            <div className="flex flex-col gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleNewMeal}
                size="sm"
              >
                Add another meal
              </Button>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  variant="default"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Creating..." : "Create Order"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
