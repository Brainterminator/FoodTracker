<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold">Food Tracker (Vue + TS + OOP)</h1>

    <div class="mt-6">
      <input
          v-model="query"
          type="text"
          placeholder="Search for food..."
          class="p-2 border rounded w-full"
      />
      <button @click="searchFood" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Search
      </button>
    </div>

    <div class="mt-6">
      <FoodCard
          v-for="food in foods"
          :key="food.name"
          :food="food"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FoodItem from "../models/FoodItem";
import Nutrients from "../models/Nutrients";
import FoodCard from "../components/FoodCard.vue";

export default defineComponent({
  name: "SearchPage",
  components: { FoodCard },
  setup() {
    const query = ref("");
    const foods = ref<FoodItem[]>([]);

    const searchFood = async () => {
      const apiKey = import.meta.env.VITE_USDA_API_KEY;
      const res = await fetch(
          `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query.value}&api_key=${apiKey}`
      );
      const data = await res.json();

      // Map JSON to FoodItem objects
      foods.value = data.foods.slice(0, 5).map((item: any) => {
        const nutrients = new Nutrients(
            item.foodNutrients.find((n: any) => n.nutrientId === 1008)?.value || 0,
            item.foodNutrients.find((n: any) => n.nutrientId === 1003)?.value || 0,
            item.foodNutrients.find((n: any) => n.nutrientId === 1005)?.value || 0,
            item.foodNutrients.find((n: any) => n.nutrientId === 2000)?.value || 0
        );
        return new FoodItem(item.description, nutrients);
      });
    };

    return { query, foods, searchFood };
  }
});
</script>
