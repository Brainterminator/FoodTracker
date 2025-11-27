<template>
  <div class="p-4 text-gray-100 flex flex-col items-center">
    <h2 class="text-xl font-semibold mb-4">Scan Barcode</h2>

    <!-- Camera preview -->
    <video ref="videoRef" class="w-full max-w-sm rounded shadow mb-4"></video>

    <div v-if="loading" class="text-gray-400">Looking up product...</div>
    <div v-if="error" class="text-red-400">{{ error }}</div>

    <div v-if="food" class="mt-4 bg-gray-800 rounded-xl p-4 w-full max-w-sm">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-semibold">{{ food.name }}</h3>
        <span
            class="text-[10px] font-semibold px-2 py-0.5 rounded bg-green-600 text-white uppercase"
        >
          OFF
        </span>
      </div>

      <p class="text-sm text-gray-400 mb-3">
        {{ food.nutrients.calories.toFixed(0) }} kcal / 100 g
      </p>

      <!-- Input + Add -->
      <div class="flex items-center gap-2 mb-1">
        <input
            v-model.number="amount"
            type="number"
            min="1"
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

      <!-- Nutrient preview -->
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
import { ref, onMounted, onUnmounted, computed } from "vue";
import { BrowserMultiFormatReader } from "@zxing/browser";
import FoodServiceOFF from "../services/FoodServiceOFF";
import { useMealsStore } from "../store/meals";

const videoRef = ref<HTMLVideoElement | null>(null);
const codeReader = new BrowserMultiFormatReader();
const foodService = new FoodServiceOFF();
const mealsStore = useMealsStore();

const loading = ref(false);
const error = ref("");
const food = ref<any>(null);
const amount = ref(100); // default grams

// compute scaled nutrients dynamically
const scaledNutrients = computed(() => {
  if (!food.value) return { protein: 0, carbs: 0, fat: 0, sugars: 0 };
  const f = food.value.nutrients;
  const scale = (amount.value || 0) / 100;
  return {
    protein: f.protein * scale,
    carbs: f.carbs * scale,
    fat: f.fat * scale,
    sugars: f.sugars * scale,
  };
});

let stopScanner: (() => void) | undefined;

onMounted(async () => {
  if (!videoRef.value) return;
  try {
    await codeReader.decodeFromVideoDevice(undefined, videoRef.value, async (result) => {
      if (result) {
        await onBarcodeScanned(result.getText());
        stopScanner?.(); // stop scanning after success
      }
    });
  } catch (e: any) {
    error.value = "Camera access failed. Please allow permissions.";
  }
});

onUnmounted(() => stopScanner?.());

async function onBarcodeScanned(code: string) {
  loading.value = true;
  error.value = "";
  try {
    const result = await foodService.getFoodByBarcode(code);
    if (result) {
      food.value = result;
    } else {
      error.value = "No product found for this barcode.";
    }
  } catch (e: any) {
    error.value = "Lookup failed.";
  } finally {
    loading.value = false;
  }
}

const addMeal = () => {
  if (!food.value || amount.value <= 0) return;
  //const scaledFood = food.value.nutrients.scaled(amount.value);
  mealsStore.addMeal(food.value, amount.value);
  amount.value = 100;
  food.value = null; // hide after adding
};
</script>
