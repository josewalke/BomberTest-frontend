<template>
  <div>
    <Header title="Temario" />
    <div v-if="role === 'admin'" class="card-container">
      <v-card class="category-card my-5 text-center py-5 m-auto" width= "100%" color="#DCEDC8">
        <span class="text-h6 mr-10">Subir nuevo archivo</span>
        <v-btn color="success" @click="createFile"> Crear </v-btn>
      </v-card>
      <FileDialog :visible="showDialog" @close="closeDialog" @reload="getFiles" />
    </div>
    <div class="card-container">
      <v-card v-for="(category, idx) in categories" :key="idx" class="my-5 category-card">
        <div class="category-title primary white--text py-3 pl-5">
          {{ category.toUpperCase() }}
        </div>
        <ExpansionPDFPanel :category="category" :topics="topics" :files="files" @reload="getFiles" />
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ExpansionPDFPanel from '../../components/ExpansionPDFPanel.vue'
import FileDialog from '../../components/FileDialog.vue'
import Header from '../../components/Header.vue'

export default {
  components: {
    ExpansionPDFPanel,
    FileDialog,
    Header
  },
  data() {
    return {
      files: [],
      categories: [],
      topics: [],
      showDialog: false
    }
  },
  computed: {
    ...mapGetters(['role','token']),
  },
  methods: {
    async getFiles() {
      if (!this.token) {
        setTimeout(() => this.getFiles(), 100);  // retry in 100ms
        return;
      }
      const files = await this.$store.dispatch('getAllTopicPDF')
      this.files = files
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
    createFile() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    },
  },
  created() {
    this.getFiles()
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