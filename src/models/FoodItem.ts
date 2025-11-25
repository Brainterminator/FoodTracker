import Nutrients from "./Nutrients";

export default class FoodItem {
    name: string;
    nutrients: Nutrients;

    constructor(name: string, nutrients: Nutrients) {
        this.name = name;
        this.nutrients = nutrients;
    }

    // Example helper
    calories(): number {
        return this.nutrients.calories;
    }

    isHighProtein(): boolean {
        return this.nutrients.protein > 20;
    }
}
