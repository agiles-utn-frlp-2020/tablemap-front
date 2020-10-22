<template>
  <nav class="flex justify-center border-solid border-2 border-gray-100 py-3">
    <a href="/" class="flex align-center outline-none focus:shadow-outline">
      <Logo width="40" height="40" class="inline-block mr-3" />
      <h1 class="inline-block text-2xl text-gray-800">TableMap</h1>
    </a>
  </nav>
</template>

<script>
import Logo from "./Logo.vue";
export default {
  components: { Logo }
};
</script>
