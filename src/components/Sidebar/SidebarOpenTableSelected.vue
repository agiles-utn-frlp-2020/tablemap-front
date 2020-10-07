<template>
  <div class="flex flex-col h-full p-4">
    <div class="flex items-center">
      <Select class="flex-1 mr-2" v-model="selected" :options="products">
      </Select>

      <!-- TODO: Hacer componente -->
      <input
        class="flex-grow-0 mr-2 h-12 p-4 w-24 rounded"
        type="number"
        v-model="quantity"
      />

      <t-button class="flex-grow-0" variant="outline" @click="addProduct"
        >Agregar producto</t-button
      >
    </div>

    <div class="flex-grow">
      <ProductCard
        class="flex-1 mr-2"
        v-for="item in order"
        :key="item.id"
        v-bind="item"
      >
      </ProductCard>
      {{ table }}
      <!-- TODO: agregar las cards de los products -->
    </div>

    <div>
      <t-button data-test-id="close" @click="$parent.$emit('close-table')"
        >Cerrar mesa</t-button
      >
      <!-- TODO: agregar precio final -->
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Select from "@/components/Select.vue";
import ProductCard from "@/components/ProductCard.vue";
import { getProducts } from "@/services/products.js";

export default {
  components: {
    "t-button": Button,
    Select,
    ProductCard
  },

  data() {
    return {
      products: [],
      order: [],
      selected: null,
      quantity: 1
    };
  },

  methods: {
    addProduct() {
      this.order.push({
        product: this.selected,
        quantity: this.quantity
      });
    }
  },
  async created() {
    this.products = await getProducts();
    this.selected = this.products[0];
  }
};
</script>
