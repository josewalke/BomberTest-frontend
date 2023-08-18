<template>
  <div v-if="role === 'admin'" class="video-list">
     <AllVideosAdmin />
  </div>
  <div v-else>
    <AllVideosUser />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AllVideosAdmin from '../../components/AllVideosAdmin.vue'
  import AllVideosUser from '../../components/AllVideosUser.vue'

  export default {
    components: {
      AllVideosAdmin,
      AllVideosUser
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