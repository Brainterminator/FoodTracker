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
      <button @click="search" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Search
      </button>
    </div>

    <div class="mt-4 text-center">
      <div v-if="loading" class="text-blue-400">Searching…</div>

      <div v-if="error" class="text-red-400">
        {{ error }}
      </div>
    </div>

    <div class="mt-6">
      <FoodCard
          v-for="food in results"
          :key="food.name"
          :food="food"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FoodService from "../services/FoodService";
import FoodCard from "../components/FoodCard.vue";
import type FoodItem from "../models/FoodItem.ts";

export default defineComponent({
  name: "SearchPage",
  components: { FoodCard },

  setup() {
    const query = ref("");
    const results = ref<FoodItem[]>([]);
    const loading = ref(false);
    const error = ref("");

    const service = new FoodService();

    const search = async () => {
      loading.value = true;
      error.value = "";
      results.value = [];

      try {
        results.value = await service.searchFoods(query.value);
      } catch (err: any) {
        error.value = err.message || "Something went wrong.";
      } finally {
        loading.value = false;
      }
    };

    return {
      query,
      results,
      loading,
      error,
      search
    };
  }
});
</script>

