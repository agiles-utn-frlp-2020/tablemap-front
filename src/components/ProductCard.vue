<template>
  <div class="w-100 bg-white p-4 flex items-center relative">
    <div class="relative h-16 w-16 rounded-lg flex-grow-0 overflow-hidden">
      <img class="absolute object-cover" :src="product.image" />
    </div>
    <div class="flex-grow-0 ml-4">
      <p class="text-2xl">{{ product.title }}</p>
      <p class="text-gray-600">cantidad: {{ quantity }}</p>
    </div>
    <div class="flex-grow flex flex-col items-end">
      <Price :price="totalPrice" class="text-3xl normal-nums"></Price>
    </div>
  </div>
</template>

<script>
import Price from "@/components/Price.vue";

export default {
  name: "ProductCard",
  props: ["quantity", "product"],
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
