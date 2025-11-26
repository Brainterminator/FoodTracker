export default class Nutrients {
    calories: number;
    protein: number;
    carbs: number;
    sugars: number;
    fat: number;

    constructor(
        calories: number,
        protein: number,
        carbs: number,
        sugars: number,
        fat: number = 0
    ) {
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.sugars = sugars;
        this.fat = fat;
    }

    scaled(amountGrams: number): Nutrients {
        const factor = amountGrams / 100;
        return new Nutrients(
            this.calories * factor,
            this.protein * factor,
            this.carbs * factor,
            this.sugars * factor,
            this.fat * factor
        );
    }
}
