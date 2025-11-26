import { defineStore } from "pinia";
import type FoodItem from "../models/FoodItem";

export const useMealsStore = defineStore("meals", {
    state: () => ({
        meals: [] as FoodItem[],
    }),
    actions: {
        addMeal(item: FoodItem) {
            this.meals.push(item);
        },
        removeMeal(index: number) {
            this.meals.splice(index, 1);
        },
        clearMeals() {
            this.meals = [];
        },
    },
});
