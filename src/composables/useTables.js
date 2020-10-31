import tableServices from "@/services/tables.js";
import { ref, computed } from "vue";

const TABLE_WIDTH = 100;
const OFFSET = 40;

export function useTables() {
  const tables = ref([]);
  const toMerge = ref({});

  const visibleTables = computed(() => {
    return tables.value.filter(t => !t.isMerged);
  });

  // Esto lo podemos guardar en selectTable, pero como no
  // es un cuello de botella lo podemos dejar aca
  const selectedTable = computed(() => {
    return tables.value.find(table => table.isSelected);
  });

  const fetchTables = async () => {
    tables.value = await tableServices.getTables();
  };

  const selectTable = ({ name } = {}) => {
    tables.value = tables.value.map(table => {
      const isSelected = table.name === name ? !table.isSelected : false;

      return {
        ...table,
        isSelected
      };
    });
  };

  const toggleSelectedTable = force => {
    tables.value = tables.value.map(table => {
      if (!table.isSelected) {
        return table;
      }

      let isOpen = force === undefined ? !table.isOpen : force;

      return {
        ...table,
        isOpen
      };
    });
  };

  const openSelectedTable = toggleSelectedTable.bind(null, true);
  const closeSelectedTable = toggleSelectedTable.bind(null, false);
  const findByName = name => tables.value.find(table => table.name === name);

  const moveTable = function({ id, x, y }) {
    if (!id) {
      return;
    }

    const table = findByName(id);

    if (!x || !y) {
      table.position.x = table.originalPosition.x;
      table.position.y = table.originalPosition.y;
      return;
    }

    table.position.x = x;
    table.position.y = y;

    const direction = table.originalPosition.x - x;
    const mergeWith = checkCollision(table, direction / Math.abs(direction));

    if (mergeWith) {
      toMerge.value = {
        fixed: mergeWith,
        moved: table
      };
    }
  };

  function aproxEqual(a, b, offset) {
    const diff = Math.abs(a - b);
    return diff < offset;
  }

  const checkCollision = function(table, direction) {
    return tables.value
      .filter(t => !t.isOpen)
      .find(t => {
        if (t.name !== table.name) {
          const nearX = aproxEqual(
            t.position.x + direction * TABLE_WIDTH,
            table.position.x,
            OFFSET
          );
          const nearY = aproxEqual(t.position.y, table.position.y, OFFSET);

          return nearX && nearY;
        }

        return false;
      });
  };

  const makeMerge = function({ moved, fixed }) {
    return {
      name: `${moved.name} / ${fixed.name}`,
      mergedTables: [moved.name, fixed.name],
      position: { ...fixed.position },
      isOpen: false,
      isSelected: false,
      order: null
    };
  };

  const merge = function() {
    const { moved, fixed } = toMerge.value;
    tableServices.joinTable(fixed.id, moved.id);

    tables.value = [...tables.value, makeMerge(toMerge.value)];

    tables.value = tables.value.map(table => {
      const isMovedTable = table.name === moved.name;
      const isFixedTable = table.name === fixed.name;

      if (isMovedTable || isFixedTable) {
        return {
          ...table,
          isMerged: true
        };
      }

      return table;
    });

    toMerge.value = {};
  };

  const cancelMerge = function() {
    const { moved } = toMerge.value;
    moved.position.x = moved.originalPosition.x;
    moved.position.y = moved.originalPosition.y;
    toMerge.value = {};
  };

  const unmerge = function(table) {
    tables.value = tables.value
      .filter(t => t.name !== table.name)
      .map(t => {
        const isMerged = table.mergedTables.includes(t.name);

        if (isMerged) {
          tableServices.unjoinTable(t.id);

          return {
            ...t,
            position: { ...t.originalPosition },
            isMerged: false
          };
        }

        return t;
      });
  };

  return {
    tables: visibleTables,
    toMerge,
    selectedTable,
    moveTable,
    fetchTables,
    selectTable,
    openSelectedTable,
    closeSelectedTable,
    cancelMerge,
    merge,
    unmerge
  };
}
