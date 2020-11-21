<template>
  <select
    class="select-native"
    :aria-labelledby="$attrs.id"
    :id="$attrs.id"
    :name="$attrs.name"
    v-model="selected.id"
    @focus="focus"
  >
    <option v-for="option in options" :value="option.id" :key="option.id">
      {{ option.text }}
    </option>
  </select>

  <div
    class="select"
    @click="toggle"
    aria-hidden="true"
    :class="{ 'select-open': isOpen }"
  >
    <div class="select-choice">
      <slot :option="selected" v-if="selected">
        {{ selected.text }}
      </slot>
    </div>

    <div class="dropdown">
      <div
        v-for="option in options"
        :key="option.id"
        class="select-option"
        @click="select(option)"
      >
        <slot :option="option">
          {{ option.text }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      isOpen: false,
      selected: {},
      options: [
        { id: 1, text: "a" },
        { id: 2, text: "b" }
      ]
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    select(option) {
      this.selected = option;
    },
    focus() {
      this.isOpen = true;
    }
  }
};
</script>

<style>
.select-native,
.select {
  position: relative;
  width: 100%;
  height: 2rem;
}

.select-native {
  visibility: none;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}

.select-native:focus + .select,
.select-open {
  box-shadow: 0 0 4px red;
}

.select-choice {
  padding-left: 0.25rem;
  height: 100%;
  width: 100%;
  border: 1px solid gray;
  display: flex;
  align-items: center;
}

.select-option {
  cursor: pointer;
  padding-left: 0.25rem;
}

.dropdown {
  display: none;
  top: 2rem;
  width: 100%;
  border: 1px solid gray;
}

.select-open .dropdown {
  position: absolute;
  display: block;
}
</style>
