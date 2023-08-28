<template>
  <div class="video-container">
    <h1 class="video-info video-title my-10 px-5 py-5 text-center" >{{ video.title }}</h1>
    <iframe width="80%" height="60%" :src="`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="video-info my-10 px-5 py-5">
      <div>
        <h2> Categoría: {{ video.topic.category }}</h2>
        <h3> Tema: {{ video.topic.name }} </h3>        
      </div>
      <v-spacer></v-spacer>
      <div class="go-back">
        Volver
        <v-icon size="70" class="play-icon mr-2" @click="goBack">
          mdi-keyboard-return
        </v-icon>        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        videoId: ''
      }
    },
    methods: {
      extractVideoId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)/;
        const match = url.match(regex);
        this.videoId = match[1]
      },
      goBack() {
        this.$router.push('/videos')
      }   
    },
    computed: {
      ...mapGetters([
        'video'
      ])
    },
    created() {
      this.extractVideoId(this.video.url)
    },
  }
</script>

<style lang="scss" scoped>
.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.video-info {
  display: flex;
  background-color: #BBDEFB;
  border-radius: 1%;
  width: 95%;
}
.video-title {
  justify-content: center;
}
.go-back {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
.go-back:hover {
  background-color: #1976d2;
  border-radius: 10%;
}
</style>