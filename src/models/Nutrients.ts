export default class Nutrients {
    constructor(
        public calories: number,
        public protein: number,
        public carbs: number,
        public sugars: number,
        public fat: number = 0
    ) {}

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
