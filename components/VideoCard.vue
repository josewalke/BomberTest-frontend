<template>
  <v-card
    class="mx-auto"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ video.topic.category }}
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ video.title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ video.topic.name }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-icon
      size="100"
      class="play-icon mr-2"
      @click="playVideo"
      >
        mdi-play-circle-outline
      </v-icon>
    </v-list-item>

    <v-card-actions>
      <v-spacer />
      <v-btn
        outlined
        rounded
        text
        class="blue"
        @click="editVideo"
      >
        Editar
        <v-spacer />
        <v-icon
        small
        class="mr-2"
        >
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn
        outlined
        rounded
        text
        class="red"
        @click="openDelete"
      >
        Borrar
        <v-icon
          small
        >
          mdi-delete
        </v-icon>
      </v-btn>
      <v-spacer />
    </v-card-actions>
    <VideoDialog :video="video" :visible="showDialog" @close="closeDialog" />
    <DeleteAlert :id="video._id" :visible="showDelete" @close="closeDelete" @reload="reload" />
  </v-card>
</template>

<script>
  import VideoDialog from './VideoDialog.vue'
  import DeleteAlert from './DeleteAlert.vue'

  export default {
    props: {
      video: {
        type: Object
      }
    },
    components: {
      VideoDialog,
      DeleteAlert
    },
    data () {
      return {
        showDialog: false,
        showDelete: false
      }
    },
    methods: {
      playVideo() {
        console.log(this.video.url)
      },
      editVideo() {
        this.showDialog = true
      },
      closeDialog() {
        this.showDialog = false
      },
      openDelete() {
        this.showDelete = true
      },
      closeDelete() {
        this.showDelete = false
      },
      reload() {
        this.$emit('reload')
      }
    }
    
  }
</script>

<style lang="scss" scoped>
  .play-icon {
    color: lightskyblue;
  }
</style>