import { API_URL } from "./constants.js";
import { parseTable, makeMergeTable } from "../composables/useTables.js";

export async function getTables() {
  const resp = await fetch(`${API_URL}/tables/`, {});
  const tables = await resp.json();
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
}

export function joinTable(fixed, moved, direction) {
  return fetch(`${API_URL}/tables/${fixed}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      join_with: moved ?? null,
      join_direction: moved ? direction : null
    })
  });
}

export function unjoinTable(fixed) {
  return joinTable(fixed);
}

export function updateTable(table) {
  return fetch(`${API_URL}/tables/${table.id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(table)
  });
}

export function createTable(table) {
  return fetch(`${API_URL}/tables/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: table.id,
      name: table.name,
      ...table.position
    }),

    credentials: "include"
  });
}

export function deleteTable(id) {
  return fetch(`${API_URL}/tables/${id}/`, {
    method: "DELETE",

    credentials: "include"
  });
}

export default {
  getTables,
  updateTable,
  createTable,
  joinTable,
  unjoinTable,
  deleteTable
};
