<template>
  <div>
    <h1 v-for="(category, idx) in categories" :key="idx">
      {{ category }}
      <h5 v-for="(topic, idx) in topics" :key="idx">
        {{ topic.category === category ? topic.name : null }}
        <div v-if="topic.category === category" v-for="(video, idx) in videos" :key="idx">
          {{ video.topic.name === topic.name ? video.title : null }}
          <v-btn
            @click="loadVideo(video)"
          >
            Ver
          </v-btn>
        </div>
      </h5>
    </h1>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        videos: [],
        categories: [],
        topics: []
      }
    },
    methods: {
      async getVideos() {
        const videos = await this.$store.dispatch('getAllVideos')
        this.videos = videos
      },
      async getTopics() {        
        const topics = await this.$store.dispatch('getAllTemas')
        this.topics = topics
        this.getCategories()
      },
      getCategories() {
        this.topics.forEach(topic => {
          !this.categories.includes(topic.category) ? this.categories.push(topic.category) : ''
        })
        this.categories.sort((a,b) => a[0].localeCompare(b[0]))
      },
      loadVideo(video) {
        this.$store.commit('saveVideo', video)
        this.$router.push(`/videos/${video.id}`)
      }
    },
    created() {
      this.getVideos()
      this.getTopics()
    }
  }
</script>

<style lang="scss" scoped>

</style>