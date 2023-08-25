<template>
  <div class="file-container">
    <h1 class="file-info file-title my-10 px-5 py-5 text-center" >{{ file.title }}</h1>
    <img v-for="(page, idx) in pages" :key="idx" class="file-img" :src="page" alt="Topic content">
    <div class="file-info my-10 px-5 py-5">
      <div>
        <h2> Categoría: {{ file.topic.category }}</h2>
        <h3> Tema: {{ file.topic.name }} </h3>        
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
        mediaData: {},
        pages: []
      }
    },
    methods: {
      goBack() {
        this.$router.push('/topics')
      }
    },
    computed: {
      ...mapGetters([
        'file'
      ])
    },
    async created() {
      this.mediaData = await this.$store.dispatch('seeMedia', this.file._id)
      this.mediaData.secure_url = this.mediaData.secure_url.replace(/\.pdf$/, '.png')
      for (let i = 1; i <= this.file.pages; i++) {
        this.pages.push(this.mediaData.secure_url.replace('/image/upload/', `$&pg_${i}/`))
      }
    } 
  }
</script>

<style lang="scss" scoped>
.file-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.file-info {
  display: flex;
  background-color: #BBDEFB;
  border-radius: 1%;
  width: 95%;
}
.file-title {
  justify-content: center;
}
.go-back {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
</style>