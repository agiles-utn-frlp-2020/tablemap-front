// MSW
// export const API_URL = `${window.location.origin}/api/v1`;

export const API_URL = process.env.NETLIFY
  ? "https://table-map.herokuapp.com/"
  : "http://localhost:8000/api/v1";
