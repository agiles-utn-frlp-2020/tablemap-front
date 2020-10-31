import { API_URL } from "./constants.js";

function parseTable(table) {
  return {
    id: table.id,
    name: `${table.id}`,
    position: {
      x: table.x,
      y: table.y
    },
    originalPosition: {
      x: table.x,
      y: table.y
    },
    isSelected: false,
    isOpen: table.orders.length > 0,
    order: [],
    isMerged: table.join_with[0]
  };
}

function makeMergeTable(moved, fixed) {
  return {
    name: `${moved.name} / ${fixed.name}`,
    mergedTables: [moved.name, fixed.name],
    position: { ...fixed.position },
    isOpen: false,
    isSelected: false,
    order: []
  };
}

export function getTables() {
  return fetch(`${API_URL}/tables/`)
    .then(resp => resp.json())
    .then(tables => {
      const fetchedTables = tables.map(parseTable);

      const mergedTables = fetchedTables
        .filter(t => t.isMerged)
        .reduce((mergedTables, table) => {
          const movedTable = fetchedTables.find(t => t.id === table.id);
          const mergedTable = makeMergeTable(movedTable, table);

          return [...mergedTables, mergedTable];
        }, []);

      return [...fetchedTables, ...mergedTables];
    });
}

export function joinTable(fixed, moved) {
  return fetch(`${API_URL}/tables/${fixed}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ join_with: moved ? [moved] : null })
  });
}

export function unjoinTable(fixed) {
  return joinTable(fixed);
}

export default {
  getTables,
  joinTable,
  unjoinTable
};
