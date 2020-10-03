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
import TableMap from "@/components/TableMap.vue";

const _tables = [
  { position: { x: 10, y: 10 }, isSelected: false, isOpen: false, name: "1" },
  { position: { x: 100, y: 150 }, isSelected: false, isOpen: true, name: "2" }
];

export default {
  components: { TableMap },
  data() {
    return {
      tables: _tables
    };
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
