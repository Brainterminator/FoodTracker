<template>
  <div class="max-w-md mx-auto mt-8 p-4 bg-gray-800 rounded-xl shadow text-gray-100 dark:bg-gray-900">
    <h1 class="text-2xl font-semibold text-center mb-6">Settings</h1>

    <!-- Theme -->
<!--    <div class="mb-5">
      <label class="block text-sm font-medium mb-2">Theme</label>
      <select
          v-model="settings.theme"
          class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
      >
        <option value="auto">Auto (system)</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>-->

    <!-- Units -->
    <div class="mb-5">
      <label class="block text-sm font-medium mb-2">Units</label>
      <select
          v-model="settings.units"
          class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
      >
        <option value="metric">Metric (g, ml, cm)</option>
        <option value="imperial">Imperial (oz, in, lb)</option>
      </select>
    </div>

    <!-- Reset -->
    <div class="text-center mt-8">
      <button
          class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
          @click="reset"
      >
        Reset to Defaults
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useSettingsStore} from '../store/settings'

const settings = useSettingsStore()

const reset = () => {
  settings.theme = 'auto'
  settings.units = 'metric'
}
</script>
