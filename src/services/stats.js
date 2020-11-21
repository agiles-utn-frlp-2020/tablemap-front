import { API_URL } from "./constants.js";

export function getStats() {
  return fetch(`${API_URL}/stats/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .then(stats => {
      return {
        bestProduct: stats["product_more"],
        worstProduct: stats["product_less"],
        bestTable: {
          name: stats["table_more"].name,
          money: stats["table_more"].money
        },
        worstTable: {
          name: stats["table_less"].name,
          money: stats["table_less"].money
        }
      };
    });
}

export default {
  getStats
};
