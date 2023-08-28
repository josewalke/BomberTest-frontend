<template>
  <div>
    <Header title="Vídeos"/>
    <div v-if="role === 'admin'" class="new-video card-container">
      <v-card class="category-container new-video my-5 text-center py-5 m-auto" width= "100%" color="#DCEDC8">
        <span class="text-h6 mr-10">Crear nuevo vídeo</span>
        <v-btn color="success" @click="createVideo"> Crear </v-btn>
      </v-card>
      <VideoDialog :visible="showDialog" @close="closeDialog" @reload="getVideos" />
    </div>
    <div class="card-container">
      <v-card v-for="(category, idx) in categories" :key="idx" class="my-5 category-card">
        <div class="category-title primary white--text py-3 pl-5">
          {{ category.toUpperCase() }}
        </div>
        <ExpansionPanel :category="category" :topics="topics" :videos="videos" @reload="getVideos" />
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ExpansionPanel from './ExpansionPanel.vue'
import VideoDialog from './VideoDialog.vue'
import Header from './Header.vue'

export default {
  components: {
    ExpansionPanel,
    VideoDialog,
    Header
  },
  data() {
    return {
      videos: [],
      categories: [],
      topics: [],
      showDialog: false
    }
  },
  computed: {
    ...mapGetters(['role','token']),
  },
  methods: {
    async getVideos() {
      if (!this.token) {
        setTimeout(() => this.getVideos(), 100);  // retry in 100ms
        return;
      }
      const videos = await this.$store.dispatch('getAllVideos')
      this.videos = videos
    },
    async getTopics() {
      if (!this.token) {
        setTimeout(() => this.getTopics(), 100);  // retry in 100ms
        return;
      }
      const topics = await this.$store.dispatch('getAllTemas')
      topics.sort((a,b) => a.name.localeCompare(b.name))
      this.topics = topics.filter(topic => topic.visible)
      this.getCategories()
    },
    getCategories() {
      this.topics.forEach((topic) => {
        !this.categories.includes(topic.category)
          ? this.categories.push(topic.category)
          : ''
      })
      this.categories.sort((a, b) => a[0].localeCompare(b[0]))
    },
    createVideo() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    },
  },
  created() {
    this.getVideos()
    this.getTopics()
  },
}
</script>

<style lang="scss" scoped>
  .video-item {
    display: flex;
  }
  .new-video {
    display: flex;
    justify-content: center;
  }
  @media (min-width: 600px) {
    .card-container{
      margin: auto;
      width: 50vw;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .category-card {
      width: 100%;
    }
  }
</style>
