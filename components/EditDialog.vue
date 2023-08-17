<template>
  <v-dialog :value="visible" @input="close" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar Vídeo</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.title"
                label="Título"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.topic"
                label="Tema"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.url"
                label="URL"
              ></v-text-field>
            </v-col>
          </v-row>
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
    }
  },
  data: () => ({
    editedItem: {
      title: 'Sin título',
      topic: '',
      url: ''
    }
  }),
  methods: {
    // showDialog() {
    //   this.$emit('show', !this.visible)
    // },
    close() {
      this.$emit('close')
    },
    save() {
      console.log('Hago cosas')
    },
    // handleDialogInput() {
    //   this.$emit('update:visible', value)
    // },
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
