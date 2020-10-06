<template>
  <div class="flex h-full items-center justify-center">
    <t-button @click="$parent.$emit('open-table')">Abrir mesa</t-button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  components: {
    "t-button": Button
  }
};
</script>
