import Nutrients from "./Nutrients";

export default class FoodItem {
    name: string;
    nutrients: Nutrients;
    source: "usda" | "off";

    constructor(name: string, nutrients: Nutrients, source: "usda" | "off" = "usda") {
        this.name = name;
        this.nutrients = nutrients;
        this.source = source;
    }

    // Example helper
    calories(): number {
        return this.nutrients.calories;
    }

    isHighProtein(): boolean {
        return this.nutrients.protein > 20;
    }
}
