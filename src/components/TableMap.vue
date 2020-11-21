<template>
  <div @click.stop="selectTable({})" @mouseup="onDrop($event)" class="relative">
    <svg viewBox="0 0 1000 800" xmlns="http://www.w3.org/2000/svg">
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

      <rect width="100%" height="100%" fill="url(#grid)" x="1" y="1" />

      <g v-if="canAddTable">
        <rect
          fill="#FFF"
          stroke="#5A67D8"
          stroke-width="4"
          width="196"
          height="196"
          x="800"
          y="600"
        ></rect>

        <table-board
          v-if="showNewTable"
          :show-detail="showTableDetail"
          v-bind="newTable"
          @mousedown="createTable($event, table)"
        ></table-board>
      </g>

      <table-board
        :key="table.name"
        :show-detail="showTableDetail"
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
        <div class="flex-grow text-xl">
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

const GRID_SIZE = 10;

export default {
  name: "TableMap",
  components: {
    TableBoard,
    Button
  },
  data() {
    return {
      isMoved: false,
      newTable: {
        id: "nueva",
        name: "Nueva mesa",
        position: {
          x: 838,
          y: 638
        }
      },
      showNewTable: true,
      movedTable: {
        id: null,
        dragOffsetX: null,
        dragOffsetY: null
      }
    };
  },
  props: {
    tables: { type: Array, required: true },
    toMerge: { type: Object, required: false },
    canMove: { type: Function, required: true },
    snap: { type: Boolean, required: false, default: false },
    showTableDetail: { type: Boolean, required: false, default: true },
    canAddTable: { type: Boolean, required: false, default: false }
  },
  computed: {
    hasMerge() {
      return this.toMerge?.fixed;
    }
  },
  methods: {
    selectTable(table) {
      if (this.isMoved) {
        this.isMoved = false;
        return;
      }
      this.$emit("select-table", table);
    },

    cancelMerge() {
      this.$emit("cancel-merge");
    },

    acceptMerge() {
      this.$emit("accept-merge");
    },

    calcNextPosition({ offsetX, offsetY }, snap) {
      const x = offsetX - this.movedTable.dragOffsetX;
      const y = offsetY - this.movedTable.dragOffsetY;

      if (snap) {
        return {
          x: GRID_SIZE * Math.round(x / GRID_SIZE),
          y: GRID_SIZE * Math.round(y / GRID_SIZE)
        };
      }

      return {
        x,
        y
      };
    },

    onDrag(e, table) {
      if (!this.canMove(table)) {
        return;
      }

      this.movedTable.id = table.id;
      this.movedTable.dragOffsetX = e.offsetX - table.position.x;
      this.movedTable.dragOffsetY = e.offsetY - table.position.y;
      this.$el.addEventListener("mousemove", this.move);

      return false;
    },

    move(e) {
      this.isMoved = true;
      this.$emit("move-table", {
        id: this.movedTable.id,
        ...this.calcNextPosition(e)
      });
    },

    createTable(e) {
      this.showNewTable = false;

      const newTable = {
        id: this.newTable.id,
        ...this.newTable.position
      };

      this.$emit("create-table", newTable);
      this.onDrag(e, this.newTable);
    },

    onDrop(e) {
      this.$emit("stop-move-table", {
        id: this.movedTable.id,
        ...this.calcNextPosition(e, this.snap)
      });

      this.$el.removeEventListener("mousemove", this.move);

      if (this.movedTable.id === "nueva") {
        this.showNewTable = true;
      }

      this.movedTable.id = null;
      this.movedTable.x = null;
      this.movedTable.y = null;

      return false;
    }
  }
};
</script>
