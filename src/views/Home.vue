<template>
  <main class="flex h-full">
    <table-map
      class="w-3/5 h-full"
      :tables="tables"
      @select-table="onSelectTable"
      @click="onSelectTable({})"
    >
    </table-map>
    <div class="w-2/5 h-full bg-gray-200">
      <Select v-model="selected" :options="products">
        Products
      </Select>
    </div>
  </main>
</template>

<script>
import TableMap from "@/components/TableMap.vue";
import Select from "@/components/Select.vue";

import { getTables } from "@/services/tables.js";
import { getProducts } from "@/services/products.js";

export default {
  components: { TableMap, Select },
  data() {
    return {
      tables: [],
      products: [],
      selected: {
        image: "",
        title: ""
      }
    };
  },
  async created() {
    this.tables = await getTables();
    this.products = await getProducts();
    this.selected = this.products[0]; // Show the first product as default
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
