<template>
  <div class="max-w-md mx-auto mt-8 p-4 bg-gray-800 rounded-xl shadow text-gray-100">
    <h1 class="text-2xl font-semibold text-center mb-4">Your Profile</h1>

    <form class="space-y-4" @submit.prevent>
      <!-- Name -->
      <div>
        <label class="block text-sm mb-1">Name</label>
        <input v-model="profile.name" type="text"
               class="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-blue-500" />
      </div>

      <!-- Age -->
      <div>
        <label class="block text-sm mb-1">Age</label>
        <input v-model.number="profile.age" type="number" min="0"
               class="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-blue-500" />
      </div>

      <!-- Gender -->
      <div>
        <label class="block text-sm mb-1">Gender</label>
        <select v-model="profile.gender"
                class="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-blue-500">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <!-- Height -->
      <div>
        <label class="block text-sm mb-1">Height (cm)</label>
        <input v-model.number="profile.height" type="number"
               class="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-blue-500" />
      </div>

      <!-- Weight -->
      <div>
        <label class="block text-sm mb-1">Weight (kg)</label>
        <input v-model.number="profile.weight" type="number"
               class="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-blue-500" />
      </div>

      <!-- Activity -->
      <div>
        <label class="block text-sm mb-1">Activity Level</label>
        <select v-model="profile.activity"
                class="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-blue-500">
          <option value="low">Low (sedentary)</option>
          <option value="medium">Medium (moderate)</option>
          <option value="high">High (active)</option>
        </select>
      </div>

      <!-- Goal -->
      <div>
        <label class="block text-sm mb-1">Goal</label>
        <select v-model="profile.goal"
                class="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-blue-500">
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
      </div>
    </form>

    <div class="mt-6 text-center">
      <p class="text-gray-300">Estimated Daily Calories</p>
      <p class="text-3xl font-bold text-blue-400">{{ calorieGoal }} kcal</p>
      <p class="text-xs text-gray-400 mt-1">(based on Mifflin–St Jeor)</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "../store/profile";

const store = useProfileStore();
const { profile, calorieGoal } = storeToRefs(store);
</script>
