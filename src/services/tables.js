import { BASE_URL } from "./constants.js";

export function getTables() {
  return fetch(`${BASE_URL}/api/v1/tables`)
    .then(resp => resp.json())
    .then(tables => {
      return tables.map(table => {
        return {
          ...table,
          isSelected: false
        };
      });
    });
}

export default {
  getTables
};
