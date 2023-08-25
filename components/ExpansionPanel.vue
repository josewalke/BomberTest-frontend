<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(topic, idx) in filterTopics" :key="idx" >
        <v-expansion-panel-header
          class="topic-title"
          v-if="filterVideos(topic._id).length !== 0"
        >
          <h3 class="font-weight-regular" >
            {{ topic.name }}
          </h3>
          <v-spacer />
          {{ filterVideos(topic._id).length }} Videos
        </v-expansion-panel-header>
        <v-expansion-panel-content
          class="video-card"
          v-for="(video, idx) in filterVideos(topic._id)"
          :key="idx"
        >
          <VideoCard :video="video" @reload="reload" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import VideoCard from './VideoCard.vue'

export default {
  components: {
    VideoCard,
  },
  props: {
    category: {
      type: String,
    },
    topics: {
      type: Array,
    },
    videos: {
      type: Array,
    },
  },
  data() {
    return {}
  },
  methods: {
    loadVideo(video) {
      this.$store.commit('saveVideo', video)
      this.$router.push(`/videos/${video._id}`)
    },
    filterVideos(id) {
      return this.videos.filter((video) => video.topic._id === id)
    },
    reload() {
      this.$emit('reload')
    },
  },
  computed: {
    filterTopics() {
      return this.topics.filter((topic) => topic.category === this.category)
    },
  },
}
</script>

<style lang="scss" scoped></style>
