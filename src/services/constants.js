// MSW
// export const API_URL = `${window.location.origin}/api/v1`;

export const API_URL =
  window.location.origin === "https://table-map.netlify.app"
    ? "https://table-map.herokuapp.com/api/v1"
    : "http://localhost:8000/api/v1";
