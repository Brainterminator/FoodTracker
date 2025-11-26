<template>
  <nav class="bg-gray-900 text-gray-200 w-full overflow-x-hidden fixed top-0 left-0 z-50">
    <div class="flex justify-between items-center h-14 px-3 sm:px-6">
      <!-- Left nav -->
      <div class="flex gap-3 sm:gap-4">
        <RouterLink
            v-for="item in leftNav"
            :key="item.name"
            :to="item.to"
            class="flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-md text-sm font-medium hover:bg-gray-700 whitespace-nowrap"
            :class="{ 'bg-gray-800 text-white': isActive(item.to) }"
        >
          <component :is="item.icon" class="w-5 h-5 mr-1 sm:mr-2" />
          <span class="hidden sm:inline">{{ item.name }}</span>
        </RouterLink>
      </div>

      <!-- Right nav -->
      <div class="flex gap-2 sm:gap-3">
        <RouterLink
            v-for="item in rightNav"
            :key="item.name"
            :to="item.to"
            class="flex items-center justify-center px-2 py-1 rounded-md text-sm hover:bg-gray-700"
            :class="{ 'bg-gray-800 text-white': isActive(item.to) }"
        >
          <!-- icon always visible -->
          <component :is="item.icon" class="w-5 h-5" />
          <!-- label only on larger screens -->
          <span class="hidden sm:inline ml-1">{{ item.name }}</span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import {
  UserIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  QrCodeIcon
} from "@heroicons/vue/24/outline";

const route = useRoute();

const leftNav = [
  { name: "Search", to: "/search", icon: MagnifyingGlassIcon },
  { name: "Tracker", to: "/tracker", icon: ChartBarIcon },
  { name: "Scanner", to: "/scanner", icon: QrCodeIcon },
];

const rightNav = [
  { name: "Profile", to: "/profile", icon: UserIcon },
  { name: "Settings", to: "/settings", icon: Cog6ToothIcon },
];

const isActive = (path: string) => route.path === path;
</script>

<style scoped>
nav {
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
</style>
