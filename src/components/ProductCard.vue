<template>
  <div class="relative w-100 bg-white p-4 flex items-center relative">
    <div class="relative h-16 w-1/5 rounded-lg flex-grow-0 overflow-hidden">
      <img class="absolute object-cover" :src="product.image" />
    </div>
    <div class="w-2/5 mx-4">
      <p class="text-2xl">{{ product.name }}</p>
      <div
        class="text-gray-600 w-32 flex items-center justify-between"
        v-if="showQuantity"
      >
        <p>
          Cantidad: <span class="normal-nums">{{ quantity }}</span>
        </p>
        <div class="flex flex-col items-end">
          <button
            @click="$emit('increment', product, 1)"
            class="overflow-hidden"
          >
            <ChevronUp class="-mb-1 h-5 hover:text-gray-900"></ChevronUp>
          </button>

          <button
            class="overflow-hidden"
            @click="$emit('decrement', product, -1)"
            :class="{ 'opacity-0': quantity <= 1 }"
            :disabled="quantity <= 1"
          >
            <ChevronDown class="-mt-1 h-5 hover:text-gray-900"></ChevronDown>
          </button>
        </div>
      </div>
    </div>
    <div class="w-2/5 flex flex-col items-end">
      <Price :price="totalPrice" class="text-3xl normal-nums"></Price>
    </div>
    <div class="absolute top-0.5 right-0.5" v-if="showTrash">
      <Trash
        width="20"
        height="20"
        class="cursor-pointer text-red-600"
        @click="$emit('remove-product', product)"
      ></Trash>
    </div>
  </div>
</template>

<script>
import Price from "@/components/Price.vue";
import Trash from "@/components/Icons/Trash.vue";
import ChevronUp from "@/components/Icons/ChevronUp.vue";
import ChevronDown from "@/components/Icons/ChevronDown.vue";

export default {
  name: "ProductCard",
  props: {
    quantity: {},
    product: {},
    showQuantity: { default: true },
    showTrash: { default: false }
  },
  components: {
    Price,
    Trash,
    ChevronUp,
    ChevronDown
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
