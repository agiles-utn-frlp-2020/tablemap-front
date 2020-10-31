<template>
  <div class="h-full flex items-center justify-center">
    <Button @click="$emit('open-table')">Abrir mesa</Button>
    <Button
      v-if="table.mergedTables"
      variant="outline"
      class="ml-1"
      @click="unMergeTable"
      >Separar mesa</Button
    >
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  props: ["table"],
  components: {
    Button
  },
  methods: {
    unMergeTable() {
      this.$emit("unmerge-table", this.table);
    }
  }
};
</script>
