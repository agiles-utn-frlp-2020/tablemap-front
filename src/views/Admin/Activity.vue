<template>
  <div class="flex flex-col flex-grow">
    <div class="pb-4 w-full h-1/2 flex flex-col flex-grow bg-white p-4">
      <p class="text-2xl pb-4 text-center">Ventas de la semana</p>

      <svg viewBox="0 0 1400 350" xmlns="http://www.w3.org/2000/svg" class="">
        <g v-for="(sale, i) in sales" :key="i" class="text-primary-300">
          <rect
            class="transition-all duration-700 ease hover:text-primary-600"
            :class="{ 'text-primary-600': sale === bestDay }"
            width="150"
            :height="350"
            fill="currentColor"
            rx="4"
            :y="getSaleRelative(sale)"
            :x="205 * i"
          ></rect>
          <text
            :x="205 * i + 75"
            y="320"
            class="text-white"
            text-anchor="middle"
            font-size="25"
            fill="currentColor"
          >
            {{ sale }} $
          </text>

          <text
            :x="205 * i + 75"
            y="290"
            class="text-white"
            text-anchor="middle"
            font-size="20"
            fill="currentColor"
          >
            {{ revertDay(i) }}
          </text>
        </g>
      </svg>
    </div>

    <div class="pt-4 w-full h-1/2 flex flex-grow ">
      <div class="mr-4 w-1/4 flex flex-col bg-white overflow-hidden rounded">
        <div class="pb-1/2 relative h-24 w-full">
          <img
            :src="stats.bestProduct.image"
            alt=""
            v-if="stats.bestProduct.image"
            class="absolute top-0 w-full h-full object-cover"
          />
        </div>

        <div class="p-6">
          <p class="text-2xl">Mejor producto</p>
          <p>{{ stats.bestProduct.name }}</p>
          <p class="text-gray-600">{{ stats.bestProduct.purchases }} ventas</p>

          <Price
            :price="getTotalPrice({ ...stats.bestProduct })"
            class="text-3xl normal-nums"
          ></Price>
        </div>
      </div>

      <div class="mr-4 w-1/4 flex flex-col bg-white overflow-hidden rounded">
        <div class="pb-1/2 relative w-full">
          <img
            :src="stats.worstProduct.image"
            alt=""
            v-if="stats.worstProduct.image"
            class="absolute top-0 w-full h-full object-cover"
          />
        </div>

        <div class="p-6">
          <p class="text-2xl">Peor producto</p>
          <p>{{ stats.worstProduct.name }}</p>
          <p class="text-gray-600">
            {{ stats.worstProduct.purchases || 0 }} ventas
          </p>

          <Price
            :price="getTotalPrice({ ...stats.worstProduct })"
            class="text-3xl normal-nums"
          ></Price>
        </div>
      </div>

      <div class="ml-4 w-1/4 flex flex-col bg-white">
        <div class="pb-1/2 relative w-full">
          <div
            class="absolute w-full h-full top-0 object-cover flex items-center justify-center"
          >
            <TableIcon class=" w-32 h-32"></TableIcon>
          </div>
        </div>

        <div class="p-6">
          <p class="text-2xl">Mejor mesa</p>
          <p class="mb-6">{{ stats.bestTable.name }}</p>

          <Price
            :price="stats.bestTable.money"
            class="text-3xl normal-nums"
          ></Price>
        </div>
      </div>

      <div class="ml-4 w-1/4 flex flex-col bg-white">
        <div class="pb-1/2 relative w-full">
          <div
            class="absolute w-full h-full top-0 object-cover flex items-center justify-center"
          >
            <TableIcon class=" w-32 h-32"></TableIcon>
          </div>
        </div>

        <div class="p-6">
          <p class="text-2xl">Peor mesa</p>
          <p class="mb-6">{{ stats.worstTable.name }}</p>

          <Price
            :price="stats.worstTable.money"
            class="text-3xl normal-nums"
          ></Price>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Price from "@/components/Price.vue";
import TableIcon from "@/components/Icons/Table.vue";
import useStats from "@/composables/useStats.js";

export default {
  components: { Price, TableIcon },
  setup() {
    const { stats, fetchStats } = useStats();
    const sales = ref([0, 0, 0, 0, 0, 0, 0]);
    const bestDay = computed(() => Math.max(...sales.value));

    fetchStats();

    const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

    setTimeout(() => {
      sales.value = [10000, 12000, 15000, 7000, 19000, 21000, 16000];
    }, 400);

    return {
      stats,
      sales,
      bestDay,
      getSaleRelative(sale) {
        return 350 - (sale * 350) / bestDay.value;
      },
      revertDay(dayIdx) {
        return days[dayIdx];
      },
      getTotalPrice({ purchases, price }) {
        return purchases * price;
      }
    };
  }
};
</script>
