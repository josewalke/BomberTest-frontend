<template>
  <div>
    <h1>{{ video.title }}</h1>
    <youtube :video-id="videoId" />
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

</style>