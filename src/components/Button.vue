<template>
  <button class="button" :class="classes">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["variant"],
  computed: {
    classes() {
      return this.variant === "outline" ? "button--outline" : "button--primary";
    }
  }
};
</script>

<style lang="postcss">
.button {
  @apply px-4;
  @apply rounded;
  @apply transition;
  @apply duration-300;

  &:focus {
    @apply shadow-outline;
    @apply outline-none;
    @apply bg-blue-100;
  }
}

.button--primary {
  @apply bg-primary-600;
  @apply py-3;
  @apply text-white;

  &:hover,
  &:focus {
    @apply bg-primary-800;
  }
}

.button--outline {
  @apply bg-white;
  @apply border-2;
  @apply border-primary-600;

  padding-top: 10px;
  padding-bottom: 10px;

  &:hover,
  &:focus {
    @apply bg-primary-600;
    @apply text-white;
  }
}
</style>
