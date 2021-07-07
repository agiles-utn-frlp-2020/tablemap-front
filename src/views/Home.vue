<template>
  <nav-bar></nav-bar>
  <main class="flex h-full">
    <table-map
      class="w-3/5 h-full"
      :tables="tables"
      @select-table="onSelectTable"
    >
    </table-map>

    <div class="w-2/5 h-full bg-gray-200">
      <sidebar
        :table="selectedTable"
        @open-table="onOpenTable"
        @close-table="onCloseTable"
      >
      </sidebar>
    </div>

    <Modal :open="openModal" @close="openModal = false">
      <template v-slot:icon>
        <Warn></Warn>
      </template>
      <template v-slot:title v-if="selectedTable">
        ¿Desea cerrar la {{ selectedTable.name }}?
      </template>
      <template v-slot:body>
        <p>
          El monto total es
          <Price
            :price="total"
            :muted="false"
            class="text-gray-900 font-bold"
          ></Price></p
      ></template>

      <template v-slot:footer>
        <Button class="mr-2" @click="closeTable">Cerrar mesa</Button>
        <Button variant="outline" @click="cancelClose">Cancelar</Button>
      </template>
    </Modal>
  </main>
</template>

<script>
import { ref, nextTick } from "vue";
import TableMap from "@/components/TableMap.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import NavBar from "@/components/NavBar.vue";
import Modal from "@/components/Modal.vue";
import Button from "@/components/Button.vue";
import Price from "@/components/Price.vue";
import Warn from "@/components/Icons/Warn.vue";

import { useTables } from "@/composables/useTables.js";
import useOrder from "@/composables/useOrder.js";

export default {
  components: { TableMap, Button, Modal, Warn, Price, Sidebar, NavBar },
  setup() {
    const {
      tables,
      selectedTable,
      openSelectedTable,
      closeSelectedTable,
      fetchTables,
      selectTable
    } = useTables();

    fetchTables();

    const openModal = ref(false);
    const total = ref(0);

    function onCloseTable() {
      if (selectedTable.value.total) {
        openModal.value = true;
        total.value = selectedTable.value.total;
      } else {
        closeTable();
      }
    }

    function cancelClose() {
      openModal.value = false;
    }

    function closeTable() {
      const { closeOrder } = useOrder(selectedTable.value.orderId);

      closeOrder();
      nextTick(() => closeSelectedTable());
      openModal.value = false;
    }

    return {
      openModal,
      total: total,
      tables,
      selectedTable,
      selectTable,
      onSelectTable: selectTable,
      onOpenTable: openSelectedTable,
      onCloseTable: onCloseTable,
      cancelClose: cancelClose,
      closeTable: closeTable
    };
  }
};
</script>
