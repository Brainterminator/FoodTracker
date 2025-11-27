<template>
  <div class="max-w-xl mx-auto px-4 sm:px-6 pt-6">
    <h1 class="text-2xl font-semibold mb-4 text-center text-gray-100">
      Food Tracker
    </h1>

    <!-- Search input -->
    <div class="flex items-center gap-2">
      <input
          v-model="query"
          type="text"
          placeholder="Search food..."
          class="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
          @click="search"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-transform"
      >
        Search
      </button>
    </div>

    <!-- Loading & error -->
    <div class="mt-4 text-center">
      <div v-if="loading" class="text-blue-400">Searching…</div>
      <div v-if="error" class="text-red-400">{{ error }}</div>
    </div>

    <!-- Results -->
    <div class="mt-6 flex flex-col gap-4">
      <FoodCard v-for="item in results" :key="item.name" :food="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FoodCard from "../components/FoodCard.vue";
import FoodServiceUSDA from "../services/FoodServiceUSDA.ts";
import type FoodItem from "../models/FoodItem";
import FoodServiceOFF from "../services/FoodServiceOFF.ts";

const query = ref("");
const results = ref<FoodItem[]>([]);
const loading = ref(false);
const error = ref("");
const serviceUSDA = new FoodServiceUSDA();
const serviceOFF = new FoodServiceOFF();

const search = async () => {
  const term = query.value.trim();
  if (!term) return;

  loading.value = true;
  error.value = "";
  results.value = [];

  try {
    const [usda, off] = await Promise.allSettled([
      serviceUSDA.searchFoods(term),
      serviceOFF.searchFoods(term),
    ]);

    const combined: FoodItem[] = [];

    if (usda.status === "fulfilled") combined.push(...usda.value);
    if (off.status === "fulfilled") combined.push(...off.value);

    // remove duplicates (by name)
    const unique = new Map(combined.map((f) => [f.name.toLowerCase(), f]));
    results.value = Array.from(unique.values());
  } catch (err: any) {
    error.value = err.message || "Something went wrong.";
  } finally {
    loading.value = false;
  }
};
</script>
