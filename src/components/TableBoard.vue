<template>
  <g>
    <rect
      rx="5"
      ry="5"
      fill="white"
      :width="width"
      :height="height"
      :stroke-width="strokeWidth"
      :class="classes"
      :x="position.x"
      :y="position.y"
    />

    <text
      text-anchor="middle"
      font-family="monospace"
      class="cursor-pointer select-none"
      :x="textPos.x"
      :y="textPos.y"
      :font-size="fontSize"
    >
      <tspan :x="textPos.x" :y="textPos.y">{{ name }}</tspan>
      <tspan v-if="isOpen" :x="textPos.x" :y="textPos.y + fontSize">Open</tspan>
    </text>
  </g>
</template>

<script>
// TODO: soportar distintos tipos de mesas
const WIDTH = 100;
const HEIGHT = 100;
const FONT_SIZE = 16;

const NORMAL_STROKE = 2;
const SELECTED_STROKE = 4;

export default {
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
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2
      };
    },

    classes() {
      const base = "stroke-current cursor-pointer";
      return this.isSelected ? `${base} text-primary-600` : base;
    },

    strokeWidth() {
      return this.isSelected ? SELECTED_STROKE : NORMAL_STROKE;
    }
  }
};
</script>
