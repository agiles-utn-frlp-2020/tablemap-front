import { ref } from "vue";
import statsServices from "@/services/stats.js";

export default function useStats() {
  const stats = ref({
    bestProduct: {},
    worstProduct: {},
    bestTable: {},
    worstTable: {}
  });

  async function fetchStats() {
    stats.value = await statsServices.getStats();
  }

  return {
    fetchStats,
    stats
  };
}
