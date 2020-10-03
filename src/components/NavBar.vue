<template>
  <nav class="flex justify-center border-solid border-2 border-gray-100 py-3">
    <a href="/" class="flex align-center">
      <Logo width="50" height="50" class="inline-block mr-3" />
      <h1 class="inline-block text-3xl text-indigo-900">TableMap</h1>
    </a>
  </nav>
</template>

<script>
import Logo from "./Logo.vue";
export default {
  components: { Logo }
};
</script>
