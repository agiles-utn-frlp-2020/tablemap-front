<template>
  <button class="px-4 rounded" :class="classes">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["variant"],
  computed: {
    classes() {
      return this.variant === "outline"
        ? "bg-white border-2 border-indigo-600 button--outline"
        : "bg-indigo-600 text-white py-3";
    }
  }
};
</script>

<style>
.button--outline {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
