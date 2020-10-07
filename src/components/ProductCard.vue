<template>
  <div class="space-y-1">
    <span class="inline-block w-full rounded-md shadow-sm">
      <div
        class="relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
      >
        <div class="flex items-center space-x-3">
          <img
            :src="product.image"
            class="flex-shrink-0 h-6 w-6 rounded-full"
          />
          <span class="block truncate">
            {{ product.title }}
          </span>
          <span class="block truncate">
            {{ product.price }}
          </span>
          <span class="block truncate">
            {{ product.quantity }}
          </span>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["quantity", "product"],
  methods: {}
};
</script>
