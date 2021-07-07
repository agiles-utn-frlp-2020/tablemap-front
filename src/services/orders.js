import { API_URL } from "./constants.js";

export function getProducts() {
  return fetch(`${API_URL}/products/`).then(resp => resp.json());
}

export function getOrder(orderId) {
  return fetch(`${API_URL}/orders/${orderId}/`).then(resp => resp.json());
}

export function createOrder(tableId) {
  return fetch(`${API_URL}/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      table: tableId
    })
  }).then(resp => resp.json());
}

export function addProductToOrder(orderId, product) {
  return fetch(`${API_URL}/orders/${orderId}/append/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });
}

export function removeProductFromOrder(orderId, product) {
  return fetch(`${API_URL}/orders/${orderId}/remove/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ product })
  });
}

export function closeOrder(orderId) {
  return fetch(`${API_URL}/orders/${orderId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      table: null
    })
  }).then(resp => resp.json());
}

export default {
  getProducts
};
