<template>
  <v-dialog :value="visible" @input="close" max-width="500px">
    <v-card>
      <v-card-title class="primary white--text">
        <!-- Si recibe el prop 'video', es que estamos editando un vídeo existente. Si no, estamos creando un vídeo nuevo -->
        <span class="text-h5">{{video ? 'Editar Vídeo' : 'Crear Vídeo'}}</span>
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

      <v-card-actions class="actions">
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="success"
          @click="save"
          :disabled="checkValidation()"
          :loading="loading"
        > 
          Guardar
        </v-btn>
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
    }
  },
  data () {
    return {
      editedInfo: {
        title: this.video ? this.video.title : '',
        topic: this.video ? this.video.topic.name : this.topics,
        url: this.video ? this.video.url : ''
      },
      topics: [],
      topicNames: [],
      loading: false
    }
  },
  methods: {
    close() {
      if (this.video) {
        this.editedInfo = {
          title: this.video.title,
          topic: this.video.topic.name,
          url: this.video.url
        }
      } else {
        this.editedInfo = {
          title: '',
          topic: this.topicNames[0],
          url: ''
        }
      }
      this.$emit('close')
    },
    async save() {
      this.loading = true
      const topic = this.topics.filter(topic => topic.name === this.editedInfo.topic)[0]
      this.editedInfo.topic = topic._id
      if (this.video) {
        await this.$store.dispatch('updateVideo', {id: this.video._id, body: this.editedInfo})
  
        this.video.title = this.editedInfo.title
        this.video.topic.name = topic.name
        this.video.topic.category = topic.category
      } else {
        await this.$store.dispatch('createVideo', this.editedInfo)
        this.$emit('reload')
      }
      this.loading = false
      this.$emit('close')
    },
    checkValidation() {
      if (this.video) {
        return this.editedInfo.title === '' || !this.editedInfo.topic
      } else {
        return this.editedInfo.title === '' || !this.editedInfo.topic || this.editedInfo.url === ''
      }
    }
  },
  async created() {
    const result = await this.$store.dispatch('getAllTemas')
    this.topics = result
    this.topicNames = this.topics
                        .map(topic => topic.name)
                        .sort((a,b) => a.localeCompare(b))
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
  
<style lang="scss" scoped>
  .actions {
    background-color: #BBDEFB
  }
</style>
