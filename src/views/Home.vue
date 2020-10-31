<template>
  <main class="flex h-full">
    <table-map
      class="w-3/5 h-full"
      :tables="tables"
      :to-merge="toMerge"
      @select-table="onSelectTable"
      @move-table="onMoveTable"
      @reset-table-position="onMoveTable"
      @cancel-merge="onCancelMerge"
      @accept-merge="onAcceptMerge"
    >
    </table-map>

    <div class="w-2/5 h-full bg-gray-200">
      <sidebar
        :table="selectedTable"
        @open-table="onOpenTable"
        @close-table="onCloseTable"
        @unmerge-table="onUnmergeTable"
      >
      </sidebar>
    </div>
  </main>
</template>

<script>
import { onMounted } from "vue";

import TableMap from "@/components/TableMap.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";

import { useTables } from "@/composables/useTables.js";

export default {
  components: { TableMap, Sidebar },
  setup() {
    const {
      tables,
      toMerge,
      selectedTable,
      moveTable,
      openSelectedTable,
      closeSelectedTable,
      fetchTables,
      selectTable,
      merge,
      unmerge,
      cancelMerge
    } = useTables();

    onMounted(fetchTables);

    return {
      tables,
      toMerge,
      selectedTable,
      selectTable,
      onSelectTable: selectTable,
      onOpenTable: openSelectedTable,
      onCloseTable: closeSelectedTable,
      onMoveTable: moveTable,
      onAcceptMerge: merge,
      onCancelMerge: cancelMerge,
      onUnmergeTable: unmerge
    };
  }
};
</script>
