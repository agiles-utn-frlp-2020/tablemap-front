<template>
  <span class="tabular-nums">
    <span>$ {{ chunkedPrice.integer }}</span>
    <span class="text-sm text-gray-600">.{{ chunkedPrice.decimal }}</span>
  </span>
</template>

<script>
import { computed } from "vue";
export default {
  name: "price",
  props: ["price"],

  setup(props) {
    const chunkedPrice = computed(() => {
      const priceString = String(parseFloat(props.price));
      const [integer, decimal = ""] = priceString.split(".");

      return {
        integer,
        decimal: decimal.padEnd(2, "0")
      };
    });

    return {
      chunkedPrice
    };
  }
};
</script>
