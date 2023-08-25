<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(topic, idx) in filterTopics" :key="idx" >
        <v-expansion-panel-header
          class="topic-title"
          v-if="filterFiles(topic._id).length !== 0"
        >
          <h3 class="font-weight-regular" >
            {{ topic.name }}
          </h3>
          <v-spacer />
          {{ filterFiles(topic._id).length }} Archivos
        </v-expansion-panel-header>
        <v-expansion-panel-content
          class="file-card"
          v-for="(file, idx) in filterFiles(topic._id)"
          :key="idx"
        >
          <FileCard :file="file" @reload="reload" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import FileCard from './FileCard.vue'

export default {
  components: {
    FileCard,
  },
  props: {
    category: {
      type: String,
    },
    topics: {
      type: Array,
    },
    files: {
      type: Array,
    },
  },
  data() {
    return {}
  },
  methods: {
    loadfile(file) {
      this.$store.commit('saveFile', file)
      this.$router.push(`/files/${file._id}`)
    },
    filterFiles(id) {
      return this.files.filter((file) => file.topic._id === id)
    },
    reload() {
      this.$emit('reload')
    },
  },
  computed: {
    filterTopics() {
      return this.topics.filter((topic) => topic.category === this.category)
    },
  },
}
</script>

<style lang="scss" scoped></style>
