import { API_URL } from "./constants.js";

export function login(credentials) {
  return fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  }).then(resp => resp.json());
}

export function logout() {
  return fetch(`${API_URL}/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
}

export default {
  login,
  logout
};
