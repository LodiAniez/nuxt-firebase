<template>
  <div
    class="
      h-screen
      w-full
      bg-gray-800
      dark:bg-gray-800
      fixed
      flex
      justify-center
      items-center
    "
  >
    <div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Nuxt+Firebase Integration',
    }
  },
}
</script>

<style></style>
