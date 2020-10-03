<template>
  <main class="flex h-full">
    <table-map
      class="w-3/5 h-full"
      :tables="tables"
      @select-table="onSelectTable"
      @click="onSelectTable({})"
    >
    </table-map>
    <div class="w-2/5 h-full bg-gray-200"></div>
  </main>
</template>

<script>
import TableMap from "@/components/TableMap.vue";
import { getTables } from "@/services/tables.js";

export default {
  components: { TableMap },
  data() {
    return {
      tables: []
    };
  },
  async created() {
    this.tables = await getTables();
  },
  methods: {
    onSelectTable({ name }) {
      this.tables = this.tables.map(table => {
        const isSelected = table.name === name ? !table.isSelected : false;

        return {
          ...table,
          isSelected
        };
      });
    }
  }
};
</script>
