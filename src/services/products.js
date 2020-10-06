import { API_URL } from "./constants.js";

export function getProducts() {
  return fetch(`${API_URL}/products`).then(resp => resp.json());
}

export default {
  getProducts
};
