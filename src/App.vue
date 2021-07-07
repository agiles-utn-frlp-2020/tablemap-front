<template>
  <router-view />
</template>

<style lang="postcss">
/* purgecss start ignore */
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

  .form-group {
    @apply .flex;
    @apply .flex-col;
  }

  input,
  .input {
    @apply border;
    @apply p-4;
    @apply h-12;
    @apply rounded-md;
    @apply shadow-sm;

    &:focus {
      @apply border-primary-400;
      @apply outline-none;
    }
  }
}
/* purgecss end ignore */
</style>
