<template>
  <div class="w-4/6 flex flex-col bg-white">
    <table-map
      class="w-full h-full"
      :tables="tables"
      :snap="true"
      :can-move="canMove"
      :can-add-table="true"
      :show-table-detail="false"
      @move-table="onMoveTable"
      @stop-move-table="updateTablePosition"
      @select-table="onSelectTable"
      @create-table="onCreateTable"
    ></table-map>
  </div>
  <div class="w-2/6 flex flex-col bg-white p-6 overflow-y-auto">
    <div v-if="!selectedTable" class="flex h-full items-center justify-center">
      <div class="flex flex-col items-center">
        <p class="text-2xl text-center">Seleccione una mesa ó cree una nueva</p>
      </div>
    </div>

    <div v-if="selectedTable" class="flex flex-col">
      <div class="form-group mb-3">
        <label for="name" class="mb-1">Nombre</label>
        <input
          type="text"
          id="name"
          class="w-full"
          v-model="selectedTable.name"
        />
      </div>

      <Button
        @click.prevent="updateTable(selectedTable.id, selectedTable)"
        class="mb-2"
        >Guardar</Button
      >
      <Button @click.prevent="deleteTable(selectedTable)" variant="danger"
        >Eliminar</Button
      >
    </div>
  </div>
</template>

<script>
import TableMap from "@/components/TableMap.vue";
import Button from "@/components/Button.vue";
import { useTables } from "@/composables/useTables.js";

export default {
  components: { TableMap, Button },
  setup() {
    const {
      tables,
      fetchTables,
      moveTable,
      updateTable,
      selectTable,
      selectedTable,
      createTable,
      deleteTable
    } = useTables({
      shouldCheckCollision: false,
      shouldFilterMerged: false
    });

    fetchTables();

    return {
      tables: tables,
      selectedTable,
      onSelectTable: selectTable,
      onMoveTable: moveTable,
      onCreateTable: createTable,
      updateTable,
      deleteTable,
      updateTablePosition: table => {
        moveTable(table);

        if (table.id === "nueva") {
          const newTable = {
            id: tables.value.length,
            name: `Mesa ${tables.value.length}`
          };

          updateTable(table.id, newTable);
        } else {
          updateTable(table.id, table);
        }
      },
      canMove: () => {
        return true;
      }
    };
  }
};
</script>
