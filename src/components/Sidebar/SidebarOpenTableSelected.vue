<template>
  <div class="flex flex-col h-full p-4">
    <div class="flex items-center">
      <Select class="flex-1 mr-2" v-model="selected" :options="products">
      </Select>

      <!-- TODO: Hacer componente -->
      <input
        class="flex-grow-0 mr-2 h-12 p-4 w-24 rounded"
        type="number"
        value="1"
      />

      <t-button class="flex-grow-0" variant="outline"
        >Agregar producto</t-button
      >
    </div>

    <div class="flex-grow">
      <!-- TODO: agregar las cards de los products -->
    </div>

    <div>
      <t-button @click="$parent.$emit('close-table')">Cerrar mesa</t-button>
      <!-- TODO: agregar precio final -->
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Select from "@/components/Select.vue";

import { getProducts } from "@/services/products.js";

export default {
  components: {
    "t-button": Button,
    Select
  },
  data() {
    return {
      products: [],
      selected: null
    };
  },
  async created() {
    this.products = await getProducts();
    this.selected = this.products[0];
  }
};
</script>
