import { defineStore } from "pinia";
import FoodItem from "../models/FoodItem";

export interface TrackedMeal {
    id: string;
    food: FoodItem;
    amount: number;
    date: string; // ISO date string
}

export const useMealsStore = defineStore("meals", {
    state: () => ({
        meals: [] as TrackedMeal[],
    }),
    getters: {
        // total calories for today
        caloriesToday: (state) => {
            const today = new Date().toISOString().split("T")[0];
            return state.meals
                .filter((m) => (m.date ?? "").startsWith(today as string))
                .reduce((sum, m) => sum + (m.food?.nutrients?.calories ?? 0), 0);
        },


        // grouped by day for the last 7 days
        caloriesByDay: (state) => {
            const now = new Date();
            const days: Record<string, number> = {};

            for (let i = 6; i >= 0; i--) {
                const d = new Date(now);
                d.setDate(now.getDate() - i);
                const key = d.toISOString().split("T")[0];
                days[key as string] = 0;
            }

            state.meals.forEach((m) => {
                const date = (m.date ?? "").split("T")[0];
                if (date && days[date] !== undefined) {
                    days[date] += m.food?.nutrients?.calories ?? 0;
                }
            });

            return days;
        },

    },
    actions: {
        addMeal(food: FoodItem, amount: number) {
            this.meals.push({
                id: crypto.randomUUID(),
                food,
                amount,
                date: new Date().toISOString(),
            });
        },
        removeMeal(id: string) {
            this.meals = this.meals.filter((m) => m.id !== id);
        },
        clearAll() {
            this.meals = [];
        },
    },
    persist: true, // ⚡ persists in localStorage (using pinia-plugin-persistedstate)
});
