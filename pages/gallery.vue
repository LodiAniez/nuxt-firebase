<template>
  <div>
    <div v-if="!gallery.length" class="text-center">
      <h1 class="text-gray-300">There are no items yet.</h1>
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 m-auto">
      <GalleryDisplay v-for="list of gallery" :key="list.id" :item="list" />
    </div>
  </div>
</template>

<script>
import GalleryDisplay from "./../components/gallery-display.vue"

export default {
  components: {
    GalleryDisplay,
  },
  computed: {
    gallery() {
      return this.$store.getters.getGallery
    },
  },
  mounted() {
    this.$store.dispatch("fetchGallery")
  },
}
</script>

<style></style>
