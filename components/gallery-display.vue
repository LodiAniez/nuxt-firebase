<template>
  <div class="p-1">
    <div class="rounded overflow-hidden shadow-lg bg-white p-1">
      <div
        @click="removeItem"
        class="
          absolute
          -mt-2.5
          -ml-2.5
          text-red-500
          bg-white
          border
          rounded-full
          p-none
          cursor-pointer
          hover:text-red-600
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <img class="w-full max-h-52" :src="item.image" :alt="item.name" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ item.name }}</div>
        <p class="text-gray-700 text-base">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GalleryDisplay',
  props: ['item'],
  methods: {
    removeItem() {
      this.$store.dispatch('removeItemFromGallery', this.item)
    },
  },
}
</script>

<style></style>
