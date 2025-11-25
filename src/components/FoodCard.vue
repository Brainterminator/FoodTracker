<template>
  <div class="p-4 bg-white shadow rounded-xl border">
    <h3 class="text-lg font-bold">{{ item.name }}</h3>
    <p class="text-sm text-gray-600">
      Calories: {{ item.nutrients.calories }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import FoodItem from "../models/FoodItem";

export default defineComponent({
  name: "FoodCard",
  props: {
    item: {
      type: Object as PropType<FoodItem>,
      required: true,
    },
  },
});
</script>
