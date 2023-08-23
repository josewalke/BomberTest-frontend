<template>
  <div>
    {{file}}
    {{fileData}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return{
      fileData: {}
    }
  },
  computed: {
    ...mapGetters([
      'file'
    ])
  },
  async created() {
    this.fileData = await this.$store.dispatch('seeMedia', this.file._id)
  }
}
</script>

<style lang="scss" scoped>

</style>