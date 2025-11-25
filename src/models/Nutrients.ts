export default class Nutrients {
    calories: number;
    protein: number;
    carbs: number;
    sugars: number;

    constructor(calories: number, protein: number, carbs: number, sugars: number) {
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.sugars = sugars;
    }
}
