<template>
  <div class="space-y-1">
    <label class="block text-sm leading-5 font-medium text-gray-700">
      Products
    </label>

    <div class="relative">
      <span class="inline-block w-full rounded-md shadow-sm">
        <button
          type="button"
          @click="openDropdown"
          class="cursor-pointer relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          <div class="flex items-center space-x-3">
            <img
              src="https://cdn2.vectorstock.com/i/1000x1000/73/86/mug-with-beer-icon-cartoon-style-vector-24217386.jpg"
              class="flex-shrink-0 h-6 w-6 rounded-full"
            />
            <span class="block truncate">
              {{ selected }}
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
        class="absolute mt-1 w-full rounded-md bg-white shadow-lg"
      >
        <ul
          tabindex="-1"
          role="listbox"
          class="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
        >
          <li
            tabindex="0"
            v-for="(elem, index) in data"
            :key="index"
            @click="select(elem)"
            role="option"
            class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9  cursor-pointer hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600"
          >
            <div class="flex items-center space-x-3">
              <img
                src="https://cdn2.vectorstock.com/i/1000x1000/73/86/mug-with-beer-icon-cartoon-style-vector-24217386.jpg"
                class="flex-shrink-0 h-6 w-6 rounded-full"
              />
              <span
                class="block truncate"
                v-bind:class="
                  isSelected(elem) ? 'font-semibold' : 'font-normal'
                "
              >
                {{ elem }}
              </span>
            </div>

            <span
              v-show="isSelected(elem)"
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
  name: "Dropdown",
  props: {
    data: Array,
    selected: String
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    isSelected(value) {
      return this.selected === value;
    },
    openDropdown() {
      this.isOpen = true;
    },
    select(value) {
      this.isOpen = false;
      this.$emit("selected", value);
    }
    // TODO: Close when click outside
    // closeDropdown() {
    //   this.isOpen = false;
    // },
  }
};
</script>
