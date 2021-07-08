<template>
  <g class="cursor-pointer relative">
    <rect
      :x="position.x"
      :y="position.y"
      rx="5"
      :width="width"
      :height="height"
      v-bind="style"
    />
    <rect rx="3" v-for="chair in chairs" :key="chair.id" v-bind="chair" />

    <text
      v-for="(t, i) in text"
      :key="t"
      data-testid="tableName"
      text-anchor="start"
      class="select-none"
      :font-size="fontSize"
      :x="textPos.x"
      :y="textPos.y + 14 * i"
    >
      {{ t }}
    </text>

    <g v-if="showDetail">
      <text
        data-testid="tableState"
        text-anchor="start"
        class="select-none text-gray-700 fill-current"
        :x="textPos.x"
        :y="textPos.y + fontSize + (text.length - 1) * 14"
        :font-size="fontSize - 4"
        v-html="stateText"
      >
      </text>

      <component :is="icon" :x="iconPos.x" :y="iconPos.y"></component>
    </g>
  </g>
</template>

<script>
import ReadyIcon from "@/components/Icons/Ready.vue";
import PeopleIcon from "@/components/Icons/People.vue";

const CHAIR_HEIGHT = 6;
const CHAIR_OFFSET = 20;

// TODO: soportar distintos tipos de mesas
const WIDTH = 120;
const HEIGHT = 120;
const FONT_SIZE = 16;

const UNSELECTED_STYLE = {
  "stroke-width": 1,
  fill: "#fff",
  "fill-opacity": 1,
  class: "stroke-current"
};

const SELECTED_STYLE = {
  "stroke-width": 2,
  fill: "#3C366B",
  "fill-opacity": 0.3,
  class: `${UNSELECTED_STYLE.class} text-primary-600`
};

export default {
  components: {
    ReadyIcon,
    PeopleIcon
  },
  props: {
    position: { required: true, type: Object },
    isSelected: { required: false, type: Boolean },
    isOpen: { required: false, type: Boolean },
    name: { required: true, type: [String, Number] },
    showDetail: { required: false, type: Boolean, default: true },
    collision: {},
    mergedTables: {}
  },
  data() {
    return {
      fontSize: FONT_SIZE
    };
  },
  computed: {
    text() {
      return this.name.split("/");
    },
    isMerged() {
      return this.mergedTables != null;
    },
    width() {
      return this.isMerged && this.collision.x ? WIDTH * 2 : WIDTH;
    },
    height() {
      return this.isMerged && this.collision.y ? HEIGHT * 2 : HEIGHT;
    },
    chairs() {
      const leftChair = {
        id: "LEFT",
        x: this.position.x - CHAIR_HEIGHT,
        y: this.position.y + CHAIR_OFFSET,
        width: CHAIR_HEIGHT,
        height: this.height - CHAIR_OFFSET * 2,
        ...this.style
      };

      const rightChair = {
        id: "RIGHT",
        x: this.position.x + this.width,
        y: this.position.y + CHAIR_OFFSET,
        width: CHAIR_HEIGHT,
        height: this.height - CHAIR_OFFSET * 2,
        ...this.style
      };

      const topChair = {
        id: "TOP",
        x: this.position.x + CHAIR_OFFSET,
        y: this.position.y - CHAIR_HEIGHT,
        width: this.width - CHAIR_OFFSET * 2,
        height: CHAIR_HEIGHT,
        ...this.style
      };

      const bottomChair = {
        id: "BOTTOM",
        x: this.position.x + CHAIR_OFFSET,
        y: this.position.y + this.height,
        width: this.width - CHAIR_OFFSET * 2,
        height: CHAIR_HEIGHT,
        ...this.style
      };

      if (!this.isMerged) {
        return [leftChair, topChair, rightChair, bottomChair];
      }

      if (this.isMerged && this.collision.x) {
        return [
          leftChair,
          rightChair,
          {
            id: "TOP-LEFT",
            x: this.position.x + CHAIR_OFFSET,
            y: this.position.y - CHAIR_HEIGHT,
            width: this.width / 2 - CHAIR_OFFSET * 2,
            height: CHAIR_HEIGHT,
            ...this.style
          },

          {
            id: "TOP-RIGHT",
            x: this.position.x + this.width / 2 + CHAIR_OFFSET,
            y: this.position.y - CHAIR_HEIGHT,
            width: this.width / 2 - CHAIR_OFFSET * 2,
            height: CHAIR_HEIGHT,
            ...this.style
          },

          {
            id: "BOTTOM-LEFT",
            x: this.position.x + CHAIR_OFFSET,
            y: this.position.y + this.height,
            width: this.width / 2 - CHAIR_OFFSET * 2,
            height: CHAIR_HEIGHT,
            ...this.style
          },

          {
            id: "BOTTOM-RIGHT",
            x: this.position.x + this.width / 2 + CHAIR_OFFSET,
            y: this.position.y + this.height,
            width: this.width / 2 - CHAIR_OFFSET * 2,
            height: CHAIR_HEIGHT,
            ...this.style
          }
        ];
      }

      return [
        topChair,
        bottomChair,
        {
          id: "LEFT-TOP",
          x: this.position.x - CHAIR_HEIGHT,
          y: this.position.y + CHAIR_OFFSET,
          width: CHAIR_HEIGHT,
          height: this.height / 2 - CHAIR_OFFSET * 2,
          ...this.style
        },
        {
          id: "LEFT-BOTTOM",
          x: this.position.x - CHAIR_HEIGHT,
          y: this.position.y + this.height / 2 + CHAIR_OFFSET,
          width: CHAIR_HEIGHT,
          height: this.height / 2 - CHAIR_OFFSET * 2,
          ...this.style
        },
        {
          id: "RIGHT-TOP",
          x: this.position.x + this.width,
          y: this.position.y + CHAIR_OFFSET,
          width: CHAIR_HEIGHT,
          height: this.height / 2 - CHAIR_OFFSET * 2,
          ...this.style
        },
        {
          id: "LEFT-BOTTOM",
          x: this.position.x + this.width,
          y: this.position.y + this.height / 2 + CHAIR_OFFSET,
          width: CHAIR_HEIGHT,
          height: this.height / 2 - CHAIR_OFFSET * 2,
          ...this.style
        }
      ];
    },
    textPos() {
      return {
        x: this.position.x + 10,
        y: this.position.y + this.height / 2
      };
    },

    iconPos() {
      return {
        x: this.position.x + this.width - 40,
        y: this.textPos.y - 15
      };
    },

    icon() {
      return this.isOpen ? "people-icon" : "ready-icon";
    },

    stateText() {
      return this.isOpen ? "Ocupada" : "Disponible";
    },

    style() {
      return this.isSelected ? SELECTED_STYLE : UNSELECTED_STYLE;
    }
  }
};
</script>
