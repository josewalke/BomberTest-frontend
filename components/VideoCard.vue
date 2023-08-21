<template>
  <v-card class="video-card mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ video.title }}
        </v-list-item-title>
      </v-list-item-content>

      <v-card-actions v-if="role === 'admin'">
        <v-spacer />
        <v-btn outlined rounded text class="primary white--text" @click="editVideo">
          Editar
          <v-spacer />
          <v-icon small class="mr-2"> mdi-pencil </v-icon>
        </v-btn>
        <v-btn outlined rounded text class="red white--text" @click="openDelete">
          Borrar
          <v-icon small> mdi-delete </v-icon>
        </v-btn>
        <v-spacer />
      </v-card-actions>
      <VideoDialog :video="video" :visible="showDialog" @close="closeDialog" />
      <DeleteAlert
        :id="video._id"
        :visible="showDelete"
        @close="closeDelete"
        @reload="reload"
      />
      <v-icon size="70" class="play-icon mr-2" @click="playVideo">
        mdi-play-circle-outline
      </v-icon>
    </v-list-item>

  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import VideoDialog from './VideoDialog.vue'
import DeleteAlert from './DeleteAlert.vue'

export default {
  props: {
    video: {
      type: Object,
    },
  },
  components: {
    VideoDialog,
    DeleteAlert,
  },
  data() {
    return {
      showDialog: false,
      showDelete: false,
    }
  },
  computed: {
    ...mapGetters(['role'])
  },
  methods: {
    playVideo() {
      this.$store.commit('saveVideo', this.video)
      this.$router.push(`/videos/${this.video._id}`)
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
    },
  },
}
</script>

<style lang="scss" scoped>
.play-icon {
  color: lightskyblue;
}
.video-card {
  border-color:#BBDEFB;
}
.video-card:hover {
  background-color:#BBDEFB;
}
</style>
