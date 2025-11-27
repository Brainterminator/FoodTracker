import FoodItem from "../models/FoodItem";
import Nutrients from "../models/Nutrients";

export default class FoodServiceOFF {
    private baseUrl = "https://world.openfoodfacts.org";

    /** Search foods by name (returns per-100 g nutrients) */
    async searchFoods(query: string): Promise<FoodItem[]> {
        if (!query.trim()) return [];

        const url = `${this.baseUrl}/cgi/search.pl?search_terms=${encodeURIComponent(
            query
        )}&search_simple=1&action=process&json=1&page_size=10`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Open Food Facts API error: " + response.statusText);
        const data = await response.json();

        if (!data.products || !Array.isArray(data.products)) return [];

        return data.products.map((p: any) => {
            const n = p.nutriments || {};

            const nutrients = new Nutrients(
                n["energy-kcal_100g"] ?? 0,
                n["proteins_100g"] ?? 0,
                n["carbohydrates_100g"] ?? 0,
                n["sugars_100g"] ?? 0,
                n["fat_100g"] ?? 0
            );

            // OFF entries often have multilingual names; pick German if available
            const name =
                p.product_name_de ||
                p.product_name_en ||
                p.product_name ||
                p.generic_name_de ||
                "Unbekanntes Produkt";

            return new FoodItem(name, nutrients, "off");
        });
    }

    /** Optional: fetch by barcode */
    async getFoodByBarcode(barcode: string): Promise<FoodItem | null> {
        const url = `${this.baseUrl}/api/v0/product/${barcode}.json`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        if (data.status !== 1) return null;

        const p = data.product;
        const n = p.nutriments || {};
        const nutrients = new Nutrients(
            n["energy-kcal_100g"] ?? 0,
            n["proteins_100g"] ?? 0,
            n["carbohydrates_100g"] ?? 0,
            n["sugars_100g"] ?? 0,
            n["fat_100g"] ?? 0
        );

        const name =
            p.product_name_de ||
            p.product_name_en ||
            p.product_name ||
            p.generic_name_de ||
            "Unbekanntes Produkt";

        return new FoodItem(name, nutrients, "off");
    }
}
