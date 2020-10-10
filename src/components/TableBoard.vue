<template>
  <g class="cursor-pointer">
    <svg
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :x="position.x"
      :y="position.y"
      :width="width"
      :height="height"
    >
      <rect
        rx="3"
        v-bind="style"
        x="6.556"
        y="6.556"
        width="136.889"
        height="136.889"
      />

      <path
        d="M48.294 1h53.412c.945 0 1.363 1.19.625 1.78l-4.26 3.408a1 1 0 01-.624.22H52.553a1 1 0 01-.624-.22l-4.26-3.407C46.931 2.19 47.35 1 48.294 1zM101.706 149H48.294c-.945 0-1.363-1.19-.624-1.781l4.259-3.407a.999.999 0 01.624-.219h44.894c.227 0 .447.077.624.219l4.26 3.407c.738.591.32 1.781-.625 1.781zM1 101.706V48.294c0-.945 1.19-1.363 1.78-.624l3.408 4.259a1 1 0 01.22.624v44.894a1 1 0 01-.22.624l-3.407 4.26c-.59.738-1.781.32-1.781-.625zM149 48.294v53.412c0 .945-1.19 1.363-1.781.625l-3.407-4.26a.999.999 0 01-.219-.624V52.553c0-.227.077-.447.219-.624l3.407-4.26c.591-.738 1.781-.32 1.781.625z"
        fill="#fff"
        v-bind="style"
      />
    </svg>

    <text
      data-testid="tableName"
      text-anchor="start"
      class="select-none"
      :font-size="fontSize"
      :x="textPos.x"
      :y="textPos.y"
    >
      {{ name }}
    </text>

    <text
      data-testid="tableState"
      text-anchor="start"
      class="select-none text-gray-700 fill-current"
      :x="textPos.x"
      :y="textPos.y + fontSize"
      :font-size="fontSize - 4"
      v-html="stateText"
    >
    </text>

    <component :is="icon" :x="iconPos.x" :y="iconPos.y"></component>
  </g>
</template>

<script>
import ReadyIcon from "@/components/Icons/Ready.vue";
import PeopleIcon from "@/components/Icons/People.vue";

// TODO: soportar distintos tipos de mesas
const WIDTH = 120;
const HEIGHT = 120;
const FONT_SIZE = 14;

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
    isSelected: { required: true, type: Boolean },
    isOpen: { required: true, type: Boolean },
    name: { required: true, type: String }
  },
  data() {
    return {
      width: WIDTH,
      height: HEIGHT,
      fontSize: FONT_SIZE
    };
  },
  computed: {
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
