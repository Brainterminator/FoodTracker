<template>
  <div
      class="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
  >
    <!-- Title -->
    <h3 class="text-lg font-semibold text-gray-800 mb-2">
      {{ food.name }}
    </h3>

    <!-- Calories -->
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm text-gray-500">Calories</span>
      <span class="text-lg font-bold text-gray-800">{{ food.nutrients.calories }} kcal</span>
    </div>

    <!-- Macronutrient Bars -->
    <div class="space-y-3">

      <!-- Protein -->
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-600">Protein</span>
          <span class="font-medium text-gray-700">{{ food.nutrients.protein }} g</span>
        </div>
        <div class="w-full h-2 rounded bg-gray-200">
          <div
              class="h-2 rounded bg-green-400"
              :style="{ width: macroPercent(food.nutrients.protein) + '%' }"
          ></div>
        </div>
      </div>

      <!-- Carbs -->
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-600">Carbs</span>
          <span class="font-medium text-gray-700">{{ food.nutrients.carbs }} g</span>
        </div>
        <div class="w-full h-2 rounded bg-gray-200">
          <div
              class="h-2 rounded bg-blue-400"
              :style="{ width: macroPercent(food.nutrients.carbs) + '%' }"
          ></div>
        </div>
      </div>

      <!-- Sugars -->
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-600">Sugars</span>
          <span class="font-medium text-gray-700">{{ food.nutrients.sugars }} g</span>
        </div>
        <div class="w-full h-2 rounded bg-gray-200">
          <div
              class="h-2 rounded bg-pink-400"
              :style="{ width: macroPercent(food.nutrients.sugars) + '%' }"
          ></div>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import FoodItem from "../models/FoodItem";

export default defineComponent({
  name: "FoodCard",
  props: {
    food: {
      type: Object as PropType<FoodItem>,
      required: true,
    },
  },
  methods: {
    macroPercent(value: number) {
      // Limit bar width to 100% for visual cleanliness
      return Math.min(100, value * 2); // quick visual scaling
    }
  }
});
</script>
