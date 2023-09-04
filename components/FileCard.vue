<template>
  <v-card class="file-card mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ file.title }}
        </v-list-item-title>
      </v-list-item-content>

      <v-card-actions v-if="role === 'admin'">
        <v-spacer />
        <v-btn outlined rounded text class="primary white--text" @click="editFile">
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
      <FileDialog
        :file="file"
        :visible="showDialog"
        :aux="true"
        @close="closeDialog"
        @reload="reload" 
      />
      <DeleteFileAlert
        :id="file._id"
        :visible="showDelete"
        @close="closeDelete"
        @reload="reload"
      />
      <ShowMediaDialog
        :file="file"
        :visible="showMedia"
        @close="closeMedia"
      />
      <v-icon size="70" :class="`mr-2 icon-${file.format}`">
        {{ getFormatIcon }}
      </v-icon>
      <v-icon size="70" class="file-icon mr-2" @click="seeMedia">
        mdi-eye-outline
      </v-icon>
      <a ref="downloadLink" download>
        <v-icon  size="70" class="file-icon mr-2" @click="downloadMedia(file._id)">
          mdi-file-download-outline
        </v-icon>
      </a>
    </v-list-item>

  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import FileDialog from './FileDialog.vue'
import DeleteFileAlert from './DeleteFileAlert.vue'
import ShowMediaDialog from './ShowMediaDialog.vue'

export default {
  props: {
    file: {
      type: Object,
    },
  },
  components: {
    FileDialog,
    DeleteFileAlert,
    ShowMediaDialog
  },
  data() {
    return {
      showDialog: false,
      showDelete: false,
      showMedia: false
    }
  },
  computed: {
    ...mapGetters(['role']),
    getFormatIcon() {
      switch(this.file.format){
        case 'xls':
        case 'csv':
        case 'xlsx':
          return 'mdi-file-excel-outline'
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          return 'mdi-image-outline'
        case 'pdf':
          return 'mdi-file-pdf-box'
        default:
          return 'mdi-file-document-outline'
      }
    }
  },
  methods: {
    seeMedia() {
      this.showMedia = true
    },
    async downloadMedia(id) {
      const fileData = await this.$store.dispatch('seeMedia', id)

      //if(this.file.format === 'pdf') {
        //fileData.secure_url = fileData.secure_url.replace(/\.pdf$/, '.png')
      //}
      
      const response = await fetch(fileData.secure_url)
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      let fileName
      if (this.file.format !== 'pdf') {
        fileName = `${this.file.title}.${this.file.format}`
      } else {
        fileName = `${this.file.title}.pdf`
      }

      this.$refs.downloadLink.href = url
      this.$refs.downloadLink.download = fileName
      this.$refs.downloadLink.click()
    },
    editFile() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    },
    closeMedia() {
      this.showMedia = false
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
  }
}
</script>

<style lang="scss" scoped>
.file-icon {
  color: lightskyblue;
}
.file-icon:hover {
  background-color: #1976d2;
  border-radius: 10%;
}
.file-card {
  border-color:#BBDEFB;
}
.file-card:hover {
  background-color:#BBDEFB;
}
.icon-xls, .icon-csv, .icon-xlsx {
  color: lightgreen;
}
.icon-jpg, .icon-png, .icon-jpeg, .icon-gif {
  color: rgb(209, 209, 19);
}
.icon-pdf {
  color: red;
}
</style>
