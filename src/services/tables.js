import { API_URL } from "./constants.js";

export function getTables() {
  return fetch(`${API_URL}/tables`)
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
