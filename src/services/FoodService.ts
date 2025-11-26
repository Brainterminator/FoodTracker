import FoodItem from "../models/FoodItem";
import Nutrients from "../models/Nutrients";

export default class FoodService {
    private apiKey: string;

    constructor() {
        this.apiKey = import.meta.env.VITE_USDA_API_KEY; // secure env variable
    }

    async searchFoods(query: string): Promise<FoodItem[]> {
        if (!query.trim()) return [];

        const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.apiKey}&query=${encodeURIComponent(
            query
        )}&pageSize=10`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("USDA API error: " + response.statusText);
        }

        const data = await response.json();

        if (!data.foods || !Array.isArray(data.foods)) {
            return [];
        }

        return data.foods.map((f: any) => {
            const nutrients = new Nutrients(
                f.foodNutrients?.find((n: any) => n.nutrientName === "Energy")?.value ?? 0,
                f.foodNutrients?.find((n: any) => n.nutrientName === "Protein")?.value ?? 0,
                f.foodNutrients?.find((n: any) => n.nutrientName === "Carbohydrate, by difference")?.value ?? 0,
                f.foodNutrients?.find((n: any) => /sugar/i.test(n.nutrientName))?.value ?? 0,
                f.foodNutrients?.find((n: any) => /fat/i.test(n.nutrientName))?.value ?? 0
            );

            return new FoodItem(f.description, nutrients);
        });
    }
}
