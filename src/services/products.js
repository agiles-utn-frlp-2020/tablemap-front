import { API_URL } from "./constants.js";

export function getProducts() {
  return fetch(`${API_URL}/products/`).then(resp => resp.json());
}

export function createProduct(product) {
  return fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...product })
  }).then(resp => resp.json());
}

export function updateProduct(product) {
  return fetch(`${API_URL}/products/${product.id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...product })
  }).then(resp => resp.json());
}

export function addProductToOrden(tableId, product) {
  return fetch(`${API_URL}/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      quantity: product.quantity,
      product: product.id,
      table: tableId
    })
  }).then(resp => resp.json());
}

export function getOrder(orderId) {
  return fetch(`${API_URL}/orders/${orderId}`).then(resp => resp.json());
}

export function deleteProduct(product) {
  return fetch(`${API_URL}/products/${product.id}`, {
    method: "DELETE"
  });
}

export default {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct
};
