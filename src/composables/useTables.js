import tableServices from "@/services/tables.js";
import { ref, computed } from "vue";

export function useTables() {
  const tables = ref([]);

  // Esto lo podemos guardar en selectTable, pero como no
  // es un cuello de botella lo podemos dejar aca
  const selectedTable = computed(() => {
    return tables.value.find(table => table.isSelected);
  });

  const fetchTables = async () => {
    tables.value = await tableServices.getTables();
  };

  const selectTable = ({ name }) => {
    tables.value = tables.value.map(table => {
      const isSelected = table.name === name ? !table.isSelected : false;

      return {
        ...table,
        isSelected
      };
    });
  };

  return {
    tables,
    selectedTable,
    fetchTables,
    selectTable
  };
}
