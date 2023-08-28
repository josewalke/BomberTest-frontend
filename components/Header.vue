<template>
  <div class="page-title text-center mb-5">
    <h1 class="py-3">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  margin: auto;
  background-color: #BBDEFB;
  border-radius: 1%;
  width: 100%;
}
</style>