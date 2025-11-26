<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <Navbar/>
    <main class="flex-1 px-4 sm:px-8 py-6">
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import Navbar from "./components/NavBar.vue";
</script>
