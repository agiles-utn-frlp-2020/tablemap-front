<template>
  <div class="w-100 bg-white p-4 flex items-center relative">
    <div class="relative h-16 w-1/5 rounded-lg flex-grow-0 overflow-hidden">
      <img class="absolute object-cover" :src="product.image" />
    </div>
    <div class="w-2/5 mx-4">
      <p class="text-2xl">{{ product.name }}</p>
      <p class="text-gray-600" v-if="showQuantity">cantidad: {{ quantity }}</p>
    </div>
    <div class="w-2/5 flex flex-col items-end">
      <Price :price="totalPrice" class="text-3xl normal-nums"></Price>
    </div>
  </div>
</template>

<script>
import Price from "@/components/Price.vue";

export default {
  name: "ProductCard",
  props: {
    quantity: {},
    product: {},
    showQuantity: { default: true }
  },
  components: {
    Price
  },
  data() {
    return {
      tables: []
    };
  },
  computed: {
    totalPrice() {
      return this.quantity * this.product.price;
    }
  }
};
</script>
