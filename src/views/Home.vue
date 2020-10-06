<template>
  <main class="flex h-full">
    <table-map
      class="w-3/5 h-full"
      :tables="tables"
      @select-table="onSelectTable"
    >
    </table-map>
    <div class="w-2/5 h-full bg-gray-200"></div>
  </main>
</template>

<script>
import { onMounted } from "vue";

import TableMap from "@/components/TableMap.vue";

import { useTables } from "@/composables/useTables.js";

export default {
  components: { TableMap },
  setup() {
    const { tables, selectedTable, fetchTables, selectTable } = useTables();

    onMounted(fetchTables);

    return {
      tables,
      selectedTable,
      selectTable,
      onSelectTable: selectTable
    };
  }
};
</script>
