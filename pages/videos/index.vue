<template>
  <div v-if="role === 'admin'" class="video-list">
     <AllVideosAdmin :list="videos" />
  </div>
  <div v-else>
    User Videos
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AllVideosAdmin from '../../components/AllVideosAdmin.vue'

  export default {
    components: {
      AllVideosAdmin
    },
    data () {
      return {
        videos: [],
      }
    },
    computed: {
      ...mapGetters([
        'role'
      ])
    },
    async mounted () {
      try {
        const result = await this.$store.dispatch('getAllVideos')
        this.videos = result
      } catch (error) {
        throw new Error (error)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>