<template>
  <SearchPage />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchPage from "./pages/SearchPage.vue";

export default defineComponent({
  name: "App",
  components: { SearchPage }
});
</script>
