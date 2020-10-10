<template>
  <div class="flex h-full items-center justify-center">
    <Button @click="$emit('open-table')">Abrir mesa</Button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  components: {
    Button
  }
};
</script>
