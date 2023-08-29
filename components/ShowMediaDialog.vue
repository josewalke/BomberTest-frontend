<template>
  <div class="text-center file-view">
    <v-dialog :value="visible" @input="close" width="80vw" :height="visible ? '80vh' : ''">
      <v-card>
        <v-card-title class="text-h5 primary white--text">
          {{ file.title }}
          <v-spacer />
          <v-icon size="30" class="file-icon mr-2" @click="close">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text class="my-3 img-container">
          <img class="file-img" v-if="isImage" :src="mediaData.url" alt="Image stored in the cloud">
          <span v-else class="my-3 py-0 d-flex align-center justify-center">Previsualización no disponible</span>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean
    },
    file: {
      type: Object
    }
  },
  data() {
    return {
      mediaData: {}
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  },
  async created() {
    this.mediaData = await this.$store.dispatch('seeMedia', this.file._id)
  },
  computed: {
    isImage() {
      return ['jpg', 'jpeg', 'png', 'gif'].includes(this.file.format);
    },
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
  .file-view {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .file-img {
    max-width: 100%;
    max-height: 100%;  
    object-fit: contain;
  }
  .img-container{
    display: flex;
    justify-content: center;
  }
</style>
