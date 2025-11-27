<template>
  <div class="bg-gray-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow relative">

    <div class="text-sm text-gray-400 mb-3 absolute top-2 right-3">{{ food.source.toUpperCase() }}</div>

    <!-- Dial -->
    <div
        class="w-24 h-24 rounded-full shrink-0"
        :style="{ background: dialGradient }"
    ></div>

    <!-- Right section -->
    <div class="flex-1 text-gray-100">
      <h3 class="text-lg font-semibold mb-2">{{ food.name }}</h3>

      <!-- Legend -->
      <div class="grid grid-cols-2 gap-x-4 text-sm mb-3">
        <div class="flex items-center gap-1">
          <span class="w-3 h-3 rounded-full bg-blue-400"></span> Carbs: {{ food.nutrients.carbs }} g
        </div>
        <div class="flex items-center gap-1">
          <span class="w-3 h-3 rounded-full bg-green-400"></span> Protein: {{ food.nutrients.protein }} g
        </div>
        <div class="flex items-center gap-1">
          <span class="w-3 h-3 rounded-full bg-yellow-400"></span> Fat: {{ food.nutrients.fat }} g
        </div>
        <div class="flex items-center gap-1">
          <span class="w-3 h-3 rounded-full bg-pink-400"></span> Sugars: {{ food.nutrients.sugars }} g
        </div>
      </div>

      <div class="text-sm text-gray-400 mb-3">Calories: {{ food.nutrients.calories }} kcal / 100 g</div>

      <!-- Input & Add -->
      <div class="flex items-center gap-2">
        <input
            v-model.number="amount"
            type="number"
            min="0"
            placeholder="grams"
            class="w-20 px-2 py-1 rounded bg-gray-700 text-gray-100 text-right"
        />
        <button
            @click="addMeal"
            class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium"
        >
          Add
        </button>
      </div>

      <!-- Result preview -->
      <div v-if="amount > 0" class="text-xs text-gray-400 mt-1">
        {{ scaledNutrients.protein.toFixed(1) }} g protein ·
        {{ scaledNutrients.carbs.toFixed(1) }} g carbs ·
        {{ scaledNutrients.fat.toFixed(1) }} g fat ·
        {{ scaledNutrients.sugars.toFixed(1) }} g sugars
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import FoodItem from "../models/FoodItem";
import { useMealsStore } from "../store/meals";

const props = defineProps<{ food: FoodItem }>();
const mealsStore = useMealsStore();

const amount = ref(0);

// computed scaled nutrients
const scaledNutrients = computed(() =>
    props.food.nutrients.scaled(amount.value || 0)
);

// color composition dial
const dialGradient = computed(() => {
  const total =
      props.food.nutrients.protein +
      props.food.nutrients.carbs +
      props.food.nutrients.fat +
      props.food.nutrients.sugars;

  if (total === 0) return "conic-gradient(#444 0 100%)";

  const p1 = (props.food.nutrients.protein / total) * 100;
  const p2 = (props.food.nutrients.carbs / total) * 100;
  const p3 = (props.food.nutrients.fat / total) * 100;
  //const p4 = (props.food.nutrients.sugars / total) * 100; TODO: WHAT'S WRONG HERE?

  return `conic-gradient(
    #22c55e 0 ${p1}%,
    #3b82f6 ${p1}% ${p1 + p2}%,
    #facc15 ${p1 + p2}% ${p1 + p2 + p3}%,
    #ec4899 ${p1 + p2 + p3}% 100%
  )`;
});

const addMeal = () => {
  if (amount.value <= 0) return;
  mealsStore.addMeal(new FoodItem(props.food.name, scaledNutrients.value));
  amount.value = 0;
};
</script>
