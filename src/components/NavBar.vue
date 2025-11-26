<template>
  <nav class="bg-gray-800 h-14 flex items-center justify-between px-4 sm:px-8">
    <!-- Left nav -->
    <div class="flex gap-4">
      <RouterLink v-for="item in leftNav" :key="item.name" :to="item.to"
                  class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                  :class="{ 'bg-gray-900': isActive(item.to) }">
        {{ item.name }}
      </RouterLink>
    </div>

    <!-- Right nav -->
    <div class="flex gap-4">
      <RouterLink v-for="item in rightNav" :key="item.name" :to="item.to"
                  class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                  :class="{ 'bg-gray-900': isActive(item.to) }">
        {{ item.name }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
const route = useRoute();

const leftNav = [
  { name: "Search", to: "/search" },
  { name: "Tracker", to: "/tracker" },
  { name: "Scanner", to: "/scanner" }, // optional
];

const rightNav = [
  { name: "Profile", to: "/profile" },
  { name: "Settings", to: "/settings" },
];

const isActive = (path: string) => route.path === path;
</script>
