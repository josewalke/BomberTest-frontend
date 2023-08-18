<template>
  <div>
    <h1>Gestionar Vídeos</h1>
    <div class="new-video">
      <span class="text-h5">Crear nuevo vídeo</span>
      <v-btn
        color="success"
        @click="createVideo"  
      >
        Crear
      </v-btn>
    </div>
    <div v-for="(item, idx) in videos" :key="idx">
      <VideoCard :video="item" @reload="getVideos" />
    </div>
    <VideoDialog :visible="showDialog" @close="closeDialog" @reload="getVideos" />
  </div>
</template>

<script>
  import VideoCard from './VideoCard.vue'
  import VideoDialog from './VideoDialog.vue'

  export default {
    components: {
      VideoCard,
      VideoDialog
    },
    data() {
      return {
        showDialog: false,
        videos: []
      }
    },
    methods: {
      createVideo() {
        this.showDialog = true
      },
      closeDialog() {
        this.showDialog = false
      },
      async getVideos() {
        const result = await this.$store.dispatch('getAllVideos')
        this.videos = result
      }
    },
    created() {
      this.getVideos()
    }
  }
</script>

<style lang="scss" scoped>

</style>