<template>
  <div class="p-4 text-gray-100">
    <h2 class="text-xl font-semibold mb-4">Calorie Tracker</h2>

    <!-- Calorie Goal -->
    <div class="mb-6">
      <p class="text-sm text-gray-400">
        Goal: {{ profile.calorieGoal }} kcal/day
      </p>
      <p class="text-lg">
        Today: <span class="font-semibold">{{ mealsStore.caloriesToday.toFixed(0) }}</span> kcal
      </p>
      <div class="w-full bg-gray-700 rounded h-3 mt-2">
        <div
            class="h-3 rounded bg-blue-500 transition-all duration-500"
            :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>

    <!-- 7-day chart -->
    <Line
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
        class="mb-6"
    />

    <!-- Today's meals list -->
    <h3 class="text-lg font-semibold mb-2">Today's meals</h3>
    <div v-if="todayMeals.length === 0" class="text-gray-400">No meals yet</div>

    <div
        v-for="m in todayMeals"
        :key="m.id"
        class="flex justify-between items-center border-b border-gray-700 py-2"
    >
      <div>
        <p>{{ m.food.name }}</p>
        <p class="text-sm text-gray-400">{{ m.food.nutrients.calories.toFixed(0) }} kcal</p>
      </div>
      <button
          @click="mealsStore.removeMeal(m.id)"
          class="text-red-400 hover:text-red-500 text-sm"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";
import { useMealsStore } from "../store/meals";
import { useProfileStore } from "../store/profile";

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement);

const mealsStore = useMealsStore();
const profile = useProfileStore();

// Progress bar for today's calories vs goal
const progress = computed(() =>
    Math.min((mealsStore.caloriesToday / profile.calorieGoal) * 100, 100)
);

// Today's meals
const today = new Date().toISOString().split("T")[0];
const todayMeals = computed(() =>
    mealsStore.meals.filter((m) => (m.date ?? "").startsWith(today as string))
);


// Chart data
const chartData = computed(() => {
  const labels = Object.keys(mealsStore.caloriesByDay);
  const data = Object.values(mealsStore.caloriesByDay);
  return {
    labels,
    datasets: [
      {
        label: "Calories per day",
        data,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: true },
  },
};
</script>
