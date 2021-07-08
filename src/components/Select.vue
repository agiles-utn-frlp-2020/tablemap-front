<template>
  <div class="z-10">
    <label class="block text-sm leading-5 font-medium text-gray-700">
      <slot></slot>
    </label>

    <div class="relative">
      <span class="h-12 inline-block w-full rounded-md shadow-sm">
        <input
          type="text"
          class="w-full"
          v-show="isOpen"
          v-model="query"
          @keypress.stop.enter="select(filterOptions[0])"
          ref="queryInput"
        />
        <button
          v-show="!isOpen"
          type="button"
          @click="toggle"
          class="cursor-pointer relative w-full h-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-primary focus:border-primary-400 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          <div class="flex items-center space-x-3" v-if="modelValue">
            <img
              v-if="modelValue.image"
              :src="modelValue.image"
              class="flex-shrink-0 h-6 w-6 rounded-full"
            />
            <span class="block truncate">
              {{ modelValue.name }}
            </span>
          </div>

          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </span>

      <!-- Options -->
      <div
        v-show="isOpen"
        class="absolute mt-1 w-full rounded-md bg-white shadow-lg rounded-md py-1 "
      >
        <ul
          tabindex="-1"
          role="listbox"
          class="max-h-56 text-base leading-6 overflow-auto focus:outline-none sm:text-sm sm:leading-5"
        >
          <li v-if="!filterOptions.length" class="option no-result">
            Sin resultados
          </li>

          <li
            tabindex="0"
            v-for="option in filterOptions"
            :key="option.id"
            @click="select(option)"
            @keypress.enter="select(option)"
            role="option"
            class="option"
            :title="option.name"
          >
            <div class="flex items-center space-x-3">
              <img
                v-if="option.image"
                :src="option.image"
                class="flex-shrink-0 h-6 w-6 rounded-full"
              />
              <span
                class="block truncate"
                v-bind:class="
                  isSelected(option.id) ? 'font-semibold' : 'font-normal'
                "
              >
                {{ option.name }}
              </span>
            </div>

            <span
              v-show="isSelected(option.id)"
              class="absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",

  props: {
    modelValue: Object,
    options: Array
  },

  mounted() {
    window.addEventListener("click", this.close, { capture: true });
  },

  unmounted() {
    window.removeEventListener("click", this.close);
  },

  data() {
    return {
      query: "",
      isOpen: false
    };
  },

  computed: {
    filterOptions() {
      if (!this.query) {
        return this.options;
      }

      const lower = this.query.toLowerCase();
      return this.options.filter(o => o.name.toLowerCase().includes(lower));
    }
  },

  methods: {
    isSelected(optionId) {
      return this.modelValue.id === optionId;
    },

    toggle() {
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        this.$nextTick(() => {
          this.$refs.queryInput.focus();
        });
      }
    },

    select(option) {
      this.$emit("update:modelValue", option);
      this.query = "";
      this.isOpen = false;
    },

    close() {
      this.isOpen = false;
    }
  }
};
</script>

<style lang="postcss">
.option {
  @apply text-gray-900;
  @apply select-none;
  @apply relative;
  @apply py-2;
  @apply px-3;

  &:not(.no-result) {
    @apply cursor-default;

    &:focus,
    &:hover {
      @apply text-white;
      @apply bg-primary-600;
    }

    &:focus {
      @apply outline-none;
    }
  }
}
</style>
