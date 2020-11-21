import tableServices from "@/services/tables.js";
import { ref, computed } from "vue";

const TABLE_WIDTH = 120;
const TABLE_HEIGHT = 120;
const OFFSET = 20;

export function makeMergeTable({ moved, fixed, xCollision, yCollision }) {
  let position;

  xCollision = xCollision || moved.position.y === fixed.position.y;
  yCollision = yCollision || moved.position.x === fixed.position.x;

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

export function useTables() {
  const tables = ref([]);
  const toMerge = ref({});

  const visibleTables = computed(() => {
    return tables.value.filter(t => !(t.isJoined || t.joinWith));
  });

  const selectedTable = computed(() => {
    return visibleTables.value.find(table => table.isSelected);
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
    const table = tables.value.find(t => t.isSelected);
    tables.value = toggleOpenState(table, force);
  };

  const toggleOpenState = (table, force) => {
    let isOpen = force === undefined ? !table.isOpen : force;

    return [
      ...tables.value.filter(t => t.name !== table.name),
      {
        ...table,
        isOpen
      }
    ];
  };

  const openSelectedTable = toggleSelectedTable.bind(null, true);
  const closeSelectedTable = toggleSelectedTable.bind(null, false);
  const findByName = name => tables.value.find(table => table.name === name);

  const moveTable = function({ id: name, x, y }) {
    if (!name || toMerge.value.fixed) {
      return;
    }

    const table = findByName(name);

    // El usuario hizo un drop
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

  const checkCollision = function(table, xDirection, yDirection) {
    let xCollision;
    let yCollision;

    const collisionTable = visibleTables.value
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
        const isJoined = table.mergedTables.find(mt => mt.name === t.name);

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
    unmerge,
    findByName
  };
}
