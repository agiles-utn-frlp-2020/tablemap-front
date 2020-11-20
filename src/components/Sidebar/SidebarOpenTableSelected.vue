<template>
  <div class="flex flex-col h-full p-4">
    <div class="flex items-center">
      <Select class="flex-1 mr-2" v-model="selectedProduct" :options="products">
      </Select>

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
          v-for="item in order"
          :key="item.product.id"
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
import useProducts from "@/composables/useProducts.js";
import useOrder from "@/composables/useOrder.js";

import { toRefs, ref, onMounted, watch } from "vue";

export default {
  props: ["table"],

  components: {
    Button,
    Select,
    ProductCard,
    Price
  },

  setup(props, ctx) {
    const { table } = toRefs(props);
    const selectedProduct = ref({});
    const quantity = ref(1);

    const { products, fetchProducts } = useProducts();

    const {
      order,
      total,
      fetchOrder,
      setProducts,
      matchOrderProducts,
      addProduct,
      closeOrder
    } = useOrder(table.value.orderId);

    watch(table, () => fetchOrder(table));

    function closeTable() {
      closeOrder();
      ctx.emit("close-table");
    }

    async function _addProduct() {
      await addProduct(selectedProduct, quantity);
      await getOrder();
      quantity.value = 1;
    }

    async function getOrder() {
      await fetchOrder(table);
      matchOrderProducts();
    }

    onMounted(async () => {
      const products = await fetchProducts();
      setProducts(products);
      getOrder();
    });

    return {
      products,
      addProduct: _addProduct,
      closeTable,
      selectedProduct,
      quantity,
      total,
      order
    };
  }
};
</script>
