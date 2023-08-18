<template>
  <div v-if="role === 'admin'" class="video-list">
     <AllVideosAdmin />
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
    computed: {
      ...mapGetters([
        'role'
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>