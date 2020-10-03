<template>
  <div>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="smallGrid"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="#EBF4FF"
            stroke-width="1"
          />
        </pattern>
        <pattern
          id="grid"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <rect width="100" height="100" fill="url(#smallGrid)" />
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            stroke="#EBF4FF"
            stroke-width="4"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" />

      <table-board
        v-for="table in tables"
        :key="table.name"
        v-bind="table"
        @click.stop="onClickTable(table)"
      ></table-board>
    </svg>
  </div>
</template>

<script>
import TableBoard from "@/components/TableBoard.vue";

export default {
  components: {
    TableBoard
  },
  props: {
    tables: { type: Array, required: true }
  },
  methods: {
    onClickTable(table) {
      this.$emit("select-table", table);
    }
  }
};
</script>
