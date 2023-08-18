<template>
  <div class="text-center">
    <v-dialog :value="visible" @input="close" width="500">
      <v-card>
        <v-card-title class="text-h5">
          Borrar Vídeo
        </v-card-title>

        <v-card-text>
          Está seguro de que desea borrar este vídeo?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="deleteVideo"> Borrar </v-btn>
          <v-btn color="red" text @click="close"> Cancelar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: [
    'visible',
    'id'
  ],
  methods: {
    close() {
      this.$emit('close')
    },
    async deleteVideo() {
      const id = this.id
      await this.$store.dispatch('deleteVideo', id)
      this.close()
      this.$emit('reload')
    }
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
