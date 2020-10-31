<template>
  <div class="flex flex-col h-full p-4">
    <div class="flex items-center">
      <Select class="flex-1 mr-2" v-model="selectedProduct" :options="products">
      </Select>
      <!-- TODO: Hacer componente -->
      <input
        class="flex-grow-0 mr-2 h-12 p-4 w-24 rounded"
        type="number"
        v-model.number="quantity"
      />

      <Button class="flex-grow-0" variant="outline" @click="addProduct"
        >Agregar producto</Button
      >
    </div>

    <div class="flex-grow mt-2">
      <div class="rounded-lg overflow-hidden">
        <ProductCard
          class="border-b-2"
          v-for="item in table.order"
          :key="item.id"
          v-bind="item"
        >
        </ProductCard>
      </div>
    </div>

    <div class="flex justify-between">
      <Button data-test-id="close" @click="closeTable">Cerrar mesa</Button>
      <Price v-if="total" :price="total" class="text-3xl"></Price>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Select from "@/components/Select.vue";
import ProductCard from "@/components/ProductCard.vue";
import Price from "@/components/Price.vue";
import { getProducts } from "@/services/products.js";

import { toRefs, ref, onMounted, computed } from "vue";

function useProducts() {
  const products = ref([]);

  async function fetchProducts() {
    products.value = await getProducts();
  }

  return {
    products,
    fetchProducts
  };
}

export default {
  props: ["table"],

  components: {
    Button,
    Select,
    ProductCard,
    Price
  },

  setup(props, ctx) {
    const { products, fetchProducts } = useProducts();

    const { table } = toRefs(props);
    const selectedProduct = ref({});
    const quantity = ref(1);
    const order = ref([]);

    const total = computed(() => {
      const order = table.value.order || [];

      return order.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
    });

    function addProduct() {
      if (!selectedProduct.value.name) {
        return;
      }

      const hasProduct = table.value.order.find(item => {
        return item.product.name === selectedProduct.value.name;
      });

      if (hasProduct) {
        hasProduct.quantity += quantity.value;
      } else {
        table.value.order.push({
          product: selectedProduct.value,
          quantity: quantity.value
        });
      }

      quantity.value = 1;
    }

    function closeTable() {
      table.value.order = [];
      ctx.emit("close-table");
    }

    onMounted(fetchProducts);

    return {
      products,
      addProduct,
      closeTable,
      selectedProduct,
      quantity,
      total,
      order
    };
  }
};
</script>
