<template>
  <div @click.stop="selectTable({})" @mouseup="onDrop($event)" class="relative">
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
        :key="table.name"
        v-for="table in tables"
        v-bind="table"
        @click.stop="selectTable(table)"
        @mousedown="onDrag($event, table)"
      ></table-board>
    </svg>

    <div
      v-if="hasMerge"
      class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75"
      id="merge"
    >
      <div
        class="w-3/4 h-48 p-4 flex flex-col select-none bg-white shadow-lg rounded"
      >
        <div class="flex-grow">
          Queres unir las mesas?
        </div>

        <div>
          <Button variant="outline" class="mr-1" @click="cancelMerge"
            >Cancelar</Button
          >
          <Button @click="acceptMerge">Unir mesas</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableBoard from "@/components/TableBoard.vue";
import Button from "@/components/Button.vue";

export default {
  name: "TableMap",
  components: {
    TableBoard,
    Button
  },
  data() {
    return {
      movedTable: {
        id: null,
        dragOffsetX: null,
        dragOffsetY: null
      }
    };
  },
  props: {
    tables: { type: Array, required: true },
    toMerge: { type: Object, required: false }
  },
  computed: {
    hasMerge() {
      return this.toMerge?.fixed;
    }
  },
  methods: {
    selectTable(table) {
      this.$emit("select-table", table);
    },

    cancelMerge() {
      console.log("cancel-merge");
      this.$emit("cancel-merge");
    },

    acceptMerge() {
      this.$emit("accept-merge");
    },

    onDrag(e, table) {
      if (table.isOpen || table.mergedTables) {
        return;
      }

      this.movedTable.id = table.name;
      this.movedTable.dragOffsetX = e.offsetX - table.position.x;
      this.movedTable.dragOffsetY = e.offsetY - table.position.y;
      this.$el.addEventListener("mousemove", this.move);
    },

    move(e) {
      this.$emit("move-table", {
        id: this.movedTable.id,
        x: e.offsetX - this.movedTable.dragOffsetX,
        y: e.offsetY - this.movedTable.dragOffsetY
      });
    },

    onDrop() {
      this.$emit("reset-table-position", {
        id: this.movedTable.id
      });

      this.$el.removeEventListener("mousemove", this.move);

      this.movedTable.id = null;
      this.movedTable.x = null;
      this.movedTable.y = null;
    }
  }
};
</script>
