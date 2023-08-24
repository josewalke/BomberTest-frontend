<template>
  <v-card class="file-card mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ pdf.title }}
        </v-list-item-title>
      </v-list-item-content>

      <div v-if="role === 'admin'">
        <v-card-actions>
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
          :file="pdf"
          :visible="showDialog"
          @close="closeDialog"
          @reload="reload" 
        />
        <DeleteFileAlert
          :id="pdf._id"
          :visible="showDelete"
          @close="closeDelete"
          @reload="reload"
        />
      </div>
      <v-icon
        size="70"
        :class="`mr-2 icon-pdf`"
        @click="showPDF"
      >
        mdi-file-pdf-box
      </v-icon>
    </v-list-item>

  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import FileDialog from './FileDialog.vue'
import DeleteFileAlert from './DeleteFileAlert.vue'

export default {
  props: {
    pdf: {
      type: Object,
    },
  },
  components: {
    FileDialog,
    DeleteFileAlert
  },
  data() {
    return {
      showDialog: false,
      showDelete: false,
    }
  },
  computed: {
    ...mapGetters(['role']),
  },
  methods: {
    async showPDF() {
      this.$store.commit('saveFile', this.pdf)
      this.$router.push(`/topics/${this.pdf._id}`)
    },
    editFile() {
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
.icon-pdf {
  color: red;
}
.icon-pdf:hover {
  background-color: #1976d2;
  border-radius: 10%;
}
</style>
