<template>
  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="50"
      height="50"
    >
      <circle cx="25" cy="25" r="25" fill="#FFF" />
    </mask>

    <g mask="url(#mask0)">
      <rect
        width="25"
        height="25"
        class="text-white fill-current hover:text-primary-100"
      />
      <rect
        y="25"
        width="25"
        height="25"
        class="text-white fill-current hover:text-primary-300"
      />
      <rect
        x="25"
        y="25"
        width="25"
        height="25"
        class="text-red-400 fill-current hover:text-primary-500"
      />
      <rect
        x="25"
        width="25"
        height="25"
        class="text-red-400 fill-current hover:text-primary-700"
      />
    </g>
  </svg>
</template>
