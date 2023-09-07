<template>
  <v-dialog :value="visible" @input="close" max-width="500px">
    <v-card>
      <v-card-title class="primary white--text">
        <span class="text-h5">{{file ? 'Editar Archivo' : 'Crear Archivo'}}</span>
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
          <v-col cols="12" v-if="!file">
            <div class="text-center">
              <input
                type="file"
                @change="selectFile"
                class="download-btn"
                ref="fileInput"
              >
            </div>
            <div class="text-center" v-if="error">
              <span class="error-message">
                {{ errorMessage }}
              </span>
            </div>
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
    file: {
      type: Object
    },
    aux: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editedInfo: {
        title: this.file ? this.file.title : '',
        topic: this.file ? this.file.topic.name : this.topics,
        file: this.file ? this.file.cloudId : '',
        auxiliary: this.aux
      },
      topics: [],
      topicNames: [],
      loading: false,
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    close() {
      if (this.file) {
        this.editedInfo = {
          title: this.file.title,
          topic: this.file.topic.name,
          file: this.file.cloudId,
          auxiliary: this.aux
        }
      } else {
        this.editedInfo = {
          title: '',
          topic: this.topicNames[0],
          file: '',
          auxiliary: this.aux
        }
      }
      this.$refs.fileInput.value = ""
      this.error = false
      this.$emit('close')
    },
    async save() {
      this.loading = true
      const topic = this.topics.filter(topic => topic.name === this.editedInfo.topic)[0]
      this.editedInfo.topic = topic._id
      if (this.file) {
        await this.$store.dispatch('updateFile', {id: this.file._id, body: this.editedInfo})
  
        this.file.title = this.editedInfo.title
        this.file.topic.name = topic.name
        this.file.topic.category = topic.category
      } else {
        const result = await this.$store.dispatch('postFile', this.editedInfo)
        if( Object.hasOwn(result, 'error') ) {
          this.loading = false
          this.error = true
          this.errorMessage = result.error.message.message
          return
        }
        this.$refs.fileInput.value = ""
      }
      this.loading = false
      this.$emit('reload')
      this.$emit('close')
    },
    async selectFile(e) {
      this.editedInfo.file = e.target.files[0]
    },
    checkValidation() {
      if (this.file) {
        return this.editedInfo.title === '' || !this.editedInfo.topic
      } else {
        return this.editedInfo.title === '' || !this.editedInfo.topic || this.editedInfo.file === ''
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
  .error-message {
    color: red;
  }
</style>
