<template>
  <nav-bar></nav-bar>
  <main class="flex h-full">
    <table-map
      class="w-3/5 h-full"
      :tables="tables"
      :to-merge="toMerge"
      :can-move="canMove"
      @select-table="onSelectTable"
      @move-table="onMoveTable"
      @stop-move-table="resetTablePosition"
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
import TableMap from "@/components/TableMap.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import NavBar from "@/components/NavBar.vue";

import { useTables } from "@/composables/useTables.js";

export default {
  components: { TableMap, Sidebar, NavBar },
  setup() {
    const {
      tables,
      toMerge,
      selectedTable,
      moveTable,
      resetTablePosition,
      openSelectedTable,
      closeSelectedTable,
      fetchTables,
      selectTable,
      merge,
      unmerge,
      cancelMerge
    } = useTables();

    fetchTables();

    function canMove(table) {
      return !(table.isOpen || table.mergedTables);
    }

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
      onUnmergeTable: unmerge,
      resetTablePosition,
      canMove
    };
  }
};
</script>
