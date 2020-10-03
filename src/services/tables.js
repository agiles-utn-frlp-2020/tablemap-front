import { BASE_URL } from "./constants.js";

export function getTables() {
  return fetch(`${BASE_URL}/api/v1/tables`).then(resp => resp.json());
}

export default {
  getTables
};
