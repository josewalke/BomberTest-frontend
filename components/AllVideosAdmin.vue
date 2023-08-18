<template>
  <div>
    <h1>Gestionar Vídeos</h1>
    <div v-for="(item, idx) in list" :key="idx">
      <VideoCard :video="item" :topicList="topics" />
    </div>
  </div>
</template>

<script>
  import VideoCard from './VideoCard.vue'

  export default {
    props: {
      list: {
        type: Array
      }
    },
    components: {
      VideoCard,
    },
    data() {
      return {
        topics: []
      }
    },
    async mounted() {
      const result = await this.$store.dispatch('getAllTemas')
      this.topics = result
    }
  }
</script>

<style lang="scss" scoped>

</style>