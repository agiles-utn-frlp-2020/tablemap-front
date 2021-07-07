<template>
  <button class="button" :class="classes">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: { default: "primary" },
    size: {}
  },
  computed: {
    classes() {
      return `button--${this.variant} button--${this.size}`;
    }
  }
};
</script>

<style lang="postcss">
/* purgecss start ignore */
.button {
  @apply px-4;
  @apply rounded;
  @apply transition;
  @apply duration-200;

  &:focus {
    @apply shadow-outline;
    @apply outline-none;
    @apply bg-blue-100;
  }
}

.button.button--sm {
  @apply p-1;
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

.button--danger {
  @appy text-red;
  @apply py-3;
  @apply border-2;
  @apply border-red-600;

  &:hover,
  &:focus {
    @apply text-white;
    @apply bg-red-800;
  }
}
/* purgecss end ignore */
</style>
