import tableServices from "@/services/tables.js";
import { ref, computed } from "vue";

const TABLE_WIDTH = 120;
const TABLE_HEIGHT = 120;
const OFFSET = 20;

export function makeMergeTable({ moved, fixed, xCollision, yCollision }) {
  // TODO: hacer lo mismo con y cuando permitamos
  // mergear desde ese punto
  let position;

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
    name: `${fixed.name} / ${moved.name}`,
    mergedTables: [moved.name, fixed.name],
    collision: { x: xCollision, y: yCollision },
    position: { ...position },
    isOpen: fixed.isOpen,
    isSelected: false,
    order: fixed.order
  };
}

export function useTables() {
  const tables = ref([]);
  const toMerge = ref({});

  const visibleTables = computed(() => {
    return tables.value.filter(t => !(t.isJoined || t.joinWith));
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
    if (!id || toMerge.value.fixed) {
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

  const checkCollision = function(table, xDirection, yDirection) {
    let xCollision;
    let yCollision;

    const collisionTable = tables.value
      .filter(t => t.name !== table.name)
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
    const { moved, fixed } = toMerge.value;
    tableServices.joinTable(fixed.id, moved.id);

    tables.value = [...tables.value, makeMergeTable(toMerge.value)];

    tables.value = tables.value.map(table => {
      const isMovedTable = table.name === moved.name;
      const isFixedTable = table.name === fixed.name;

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
      .filter(t => t.name !== table.name)
      .map(t => {
        const isJoined = table.mergedTables.includes(t.name);

        if (isJoined) {
          tableServices.unjoinTable(t.id);

          return {
            ...t,
            position: { ...t.originalPosition },
            isJoined: false,
            joinWith: null
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
