<template>
  <div class="flex flex-col h-full p-4">
    <div class="flex items-center">
      <Select class="flex-1 mr-2" v-model="selectedProduct" :options="products">
      </Select>

      <input
        class="flex-grow-0 mr-2 h-12 p-4 w-24 rounded"
        type="number"
        min="1"
        v-model.number="quantity"
      />

      <Button class="flex-grow-0" variant="outline" @click="addProduct"
        >Agregar producto</Button
      >
    </div>

    <p v-show="error" class="mt-2 text-red-600">{{ error }}</p>

    <div class="flex-grow mt-2">
      <div class="rounded-lg overflow-hidden">
        <ProductCard
          class="border-b-2"
          v-for="item in order"
          v-bind="item"
          :show-trash="true"
          :key="item.product.id"
          @remove-product="removeProduct"
          @increment="changeQuantity"
          @decrement="changeQuantity"
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
      removeProduct,
      setOrderId
    } = useOrder(table.value.orderId);

    watch(table, () => {
      setOrderId(table.value.orderId);
      return getOrder();
    });

    function closeTable() {
      ctx.emit("close-table");
    }

    const error = ref("");

    watch(selectedProduct, resetValidation);
    watch(quantity, resetValidation);

    function resetValidation() {
      error.value = "";
    }

    function validate() {
      if (!selectedProduct.value.name) {
        error.value = "Por favor seleccione un producto";
        return false;
      }

      if (quantity.value < 0) {
        error.value = "La cantidad no puede ser negativa";
        return false;
      }

      return true;
    }

    async function changeQuantity(product, quantity) {
      await addProduct(ref(product), ref(quantity));
      await getOrder();
    }

    async function _addProduct() {
      if (!validate()) {
        return;
      }

      await addProduct(selectedProduct, quantity);
      await getOrder();
      quantity.value = 1;
    }

    async function _removeProduct(product) {
      await removeProduct(product);
      await getOrder();
    }

    async function getOrder() {
      await fetchOrder(table);
      matchOrderProducts();
      table.value.total = total;
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
      order,
      removeProduct: _removeProduct,
      error,
      changeQuantity
    };
  }
};
</script>
