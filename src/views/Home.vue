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
      <Dropdown :data="beers" :selected="selected" @selected="onSelected">
      </Dropdown>
    </div>
  </main>
</template>

<script>
import TableMap from "@/components/TableMap.vue";
import Dropdown from "@/components/Dropdown.vue";

import { getTables } from "@/services/tables.js";

export default {
  components: { TableMap, Dropdown },
  data() {
    return {
      tables: [],
      selected: "IPA",
      beers: ["IPA", "PALE ALE", "STOUT", "PORTER", "HONEY"]
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
    },
    onSelected(value) {
      this.selected = value;
    }
  }
};
</script>
