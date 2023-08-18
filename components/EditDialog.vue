<template>
  <v-dialog :value="visible" @input="close" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar Vídeo</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-col cols="12">
            <v-text-field
              outlined
              v-model="editedInfo.title"
              label="Título"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              outlined
              v-model="editedInfo.topic"
              :items="topicNames"
              label="Tema"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              v-model="editedInfo.url"
              label="URL"
            ></v-text-field>
          </v-col>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    video: {
      type: Object
    },
    topics: {
      type: Array
    }
  },
  data () {
    return {
      editedInfo: {
        title: this.video.title,
        topic: this.video.topic.name,
        url: this.video.url
      },
      topicNames: []
    }
  },
  methods: {
    close() {
      this.editedInfo = {
        title: this.video.title,
        topic: this.video.topic.name,
        url: this.video.url
      }
      this.$emit('close')
    },
    async save() {
      const topic = this.topics.filter(topic => topic.name === this.editedInfo.topic)[0]
      this.editedInfo.topic = topic._id
      await this.$store.dispatch('updateVideo', {id: this.video._id, body: this.editedInfo})

      this.video.title = this.editedInfo.title
      this.video.topic.name = topic.name
      this.video.topic.category = topic.category

      this.$emit('close')
    },
    getTopic() {
      return this.video.topic ? this.video.topic.name : '' //cambiarlo a computed
    }
  },
  mounted () {
    this.topicNames = this.topics.map(topic => topic.name)
  },
  watch: {
    visible(newValue) {
      if (!newValue) {
        this.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
