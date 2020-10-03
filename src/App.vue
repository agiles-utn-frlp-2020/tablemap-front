<template>
  <nav-bar></nav-bar>
  <router-view />
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar
  }
};
</script>

<style lang="postcss">
@import "assets/styles/tailwind.postcss";

@layer base {
  #app {
    @apply h-screen;
    @apply flex;
    @apply flex-col;
  }

  h1 {
    @apply text-2xl;
  }

  h2 {
    @apply text-xl;
  }
}
</style>
