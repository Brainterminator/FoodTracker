import FoodItem from "./FoodItem";

export default class DayLog {
    date: string;
    foods: FoodItem[];

    constructor(date: string) {
        this.date = date;
        this.foods = [];
    }

    addFood(food: FoodItem) {
        this.foods.push(food);
    }

    totalCalories(): number {
        return this.foods.reduce((sum, f) => sum + f.calories(), 0);
    }
}
