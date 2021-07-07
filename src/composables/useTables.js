import tableServices from "@/services/tables.js";
import { ref, computed } from "vue";

const TABLE_WIDTH = 120;
const TABLE_HEIGHT = 120;
const OFFSET = 20;

export function parseTable(table) {
  return {
    id: table.id,
    name: table.name ? `${table.name}` : `Mesa ${table.id}`,
    position: {
      x: table.x,
      y: table.y
    },
    originalPosition: {
      x: table.x,
      y: table.y
    },
    isSelected: false,
    isOpen: table.order != null,
    orderId: table.order,
    order: [],
    joinWith: table.join_with,
    joinDirection: table.join_direction
  };
}

export function makeMergeTable({ moved, fixed, xCollision, yCollision }) {
  let position;

  // Estamos suponiendo que comparten 1 coordenada
  xCollision = xCollision || fixed.joinDirection === "X";
  yCollision = yCollision || fixed.joinDirection === "Y";

  if (xCollision) {
    if (fixed.position.x < moved.position.x) {
      position = fixed.position;
    } else {
      position = {
        x: fixed.position.x - TABLE_WIDTH,
        y: fixed.position.y
      };
    }
  } else if (yCollision) {
    if (fixed.position.y < moved.position.y) {
      position = fixed.position;
    } else {
      position = {
        x: fixed.position.x,
        y: fixed.position.y - TABLE_HEIGHT
      };
    }
  }

  return {
    id: `${fixed.name} / ${moved.name}`,
    name: `${fixed.name} / ${moved.name}`,
    mergedTables: [moved, fixed],
    collision: { x: xCollision, y: yCollision },
    position: { ...position },
    isOpen: fixed.isOpen,
    isSelected: false,
    orderId: fixed.orderId,
    order: fixed.order
  };
}

function aproxEqual(a, b, offset) {
  const diff = Math.abs(a - b);
  return diff < offset;
}

const checkYColision = (positionFixed, positionMoved, yDirection) => {
  const nearX = aproxEqual(positionMoved.x, positionFixed.x, OFFSET);
  const nearY = aproxEqual(
    positionMoved.y + yDirection * TABLE_WIDTH,
    positionFixed.y,
    OFFSET
  );

  return nearX && nearY;
};

const checkXColision = (positionFixed, positionMoved, xDirection) => {
  const nearX = aproxEqual(
    positionMoved.x + xDirection * TABLE_WIDTH,
    positionFixed.x,
    OFFSET
  );

  const nearY = aproxEqual(positionMoved.y, positionFixed.y, OFFSET);

  return nearX && nearY;
};

export function useTables(
  { shouldCheckCollision, shouldFilterMerged } = {
    shouldCheckCollision: true,
    shouldFilterMerged: true
  }
) {
  const tables = ref([]);
  const toMerge = ref({});

  const visibleTables = computed(() => {
    if (!shouldFilterMerged) {
      return tables.value.filter(t => !t.mergedTables);
    }

    return tables.value.filter(t => !(t.isJoined || t.joinWith));
  });

  const selectedTable = computed(() => {
    return visibleTables.value.find(table => table.isSelected);
  });

  const fetchTables = async () => {
    tables.value = await tableServices.getTables();
  };

  const selectTable = ({ id } = {}) => {
    tables.value = tables.value.map(table => {
      const isSelected = table.id === id ? !table.isSelected : false;

      return {
        ...table,
        isSelected
      };
    });
  };

  const toggleSelectedTable = force => {
    const table = tables.value.find(t => t.isSelected);
    tables.value = toggleOpenState(table, force);
    return table;
  };

  const toggleOpenState = (table, force) => {
    let isOpen = force === undefined ? !table.isOpen : force;

    return [
      ...tables.value.filter(t => t.id !== table.id),
      {
        ...table,
        isOpen
      }
    ];
  };

  const openSelectedTable = toggleSelectedTable.bind(null, true);
  const closeSelectedTable = () => {
    selectedTable.value.orderId = null;
    toggleSelectedTable(false);
  };

  const findById = id => tables.value.find(table => table.id === id);

  const resetTablePosition = function({ id }) {
    const table = findById(id);
    if (!table) {
      return;
    }

    table.position.x = table.originalPosition.x;
    table.position.y = table.originalPosition.y;
  };

  const moveTable = function({ id, x, y }) {
    if (!id || toMerge.value.fixed) {
      return;
    }

    const table = findById(id);

    table.position.x = x;
    table.position.y = y;

    if (!shouldCheckCollision) {
      return;
    }

    const xDirection = table.originalPosition.x - x;
    const yDirection = table.originalPosition.y - y;

    const collision = checkCollision(
      table,
      xDirection !== 0 ? xDirection / Math.abs(xDirection) : 1,
      yDirection !== 0 ? yDirection / Math.abs(yDirection) : 1
    );

    if (collision) {
      toMerge.value = {
        xCollision: collision.xCollision,
        yCollision: collision.yCollision,
        fixed: collision.table,
        moved: table
      };
    }
  };

  const checkCollision = function(table, xDirection, yDirection) {
    let xCollision;
    let yCollision;

    const collisionTable = visibleTables.value
      .filter(t => t.id !== table.id && !t.mergedTables)
      .find(t => {
        yCollision = checkYColision(table.position, t.position, yDirection);
        xCollision = checkXColision(table.position, t.position, xDirection);

        return xCollision || yCollision;
      });

    return {
      xCollision,
      yCollision,
      table: collisionTable
    };
  };

  const merge = function() {
    const { moved, fixed, xCollision } = toMerge.value;
    const collision = xCollision ? "X" : "Y";

    tableServices.joinTable(fixed.id, moved.id, collision);

    tables.value = [...tables.value, makeMergeTable(toMerge.value)];

    tables.value = tables.value.map(table => {
      const isMovedTable = table.id === moved.id;
      const isFixedTable = table.id === fixed.id;

      if (isMovedTable || isFixedTable) {
        return {
          ...table,
          isJoined: true
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
      .filter(t => t.id !== table.id)
      .map(t => {
        const isJoined = table.mergedTables.find(mt => mt.id === t.id);

        if (isJoined) {
          tableServices.unjoinTable(t.id);

          return {
            ...t,
            position: { ...t.originalPosition },
            isOpen: false, // Siempre una mesa que se separa queda cerrada
            isJoined: false,
            joinWith: null
          };
        }

        return t;
      });
  };

  const updateTable = function(id, table) {
    if (!id) {
      return;
    }

    let newTable;

    tables.value = tables.value.map(t => {
      if (t.id === id) {
        newTable = {
          ...t,
          ...table
        };
        return newTable;
      }
      return t;
    });

    if (id === "nueva") {
      tableServices.createTable(newTable);
    } else {
      tableServices.updateTable(table);
    }
  };

  const createTable = function(newTable) {
    tables.value = [...tables.value, parseTable(newTable)];
  };

  const deleteTable = function(table) {
    tables.value = tables.value.filter(t => t.id !== table.id);
    return tableServices.deleteTable(table.id);
  };

  return {
    tables: visibleTables,
    toMerge,
    selectedTable,
    moveTable,
    resetTablePosition,
    createTable,
    fetchTables,
    updateTable,
    selectTable,
    openSelectedTable,
    closeSelectedTable,
    cancelMerge,
    merge,
    unmerge,
    findById,
    deleteTable
  };
}
