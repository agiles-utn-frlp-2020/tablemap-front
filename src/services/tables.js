import { API_URL } from "./constants.js";
import { makeMergeTable } from "../composables/useTables.js";

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
    joinWith: table.join_with
  };
}

export function getTables() {
  return fetch(`${API_URL}/tables/`)
    .then(resp => resp.json())
    .then(tables => {
      const fetchedTables = tables.map(parseTable);

      const mergedTables = fetchedTables
        .filter(t => t.joinWith)
        .reduce((mergedTables, table) => {
          const movedTable = fetchedTables.find(t => t.id === table.joinWith);
          const mergedTable = makeMergeTable({
            moved: movedTable,
            fixed: table
          });
          movedTable.isJoined = true;

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
    body: JSON.stringify({ join_with: moved ?? null })
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
