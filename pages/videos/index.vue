<template>
<div>
  <v-data-table
    :headers="headers"
    :items="videos"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  <EditDialog :visible="showDialog" @close="closeDialog" />
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import EditDialog from '../../components/EditDialog.vue'
  export default {
    components: {
      EditDialog
    },
    data () {
      return {
        dialogDelete: false,
        headers: [
          {
            text: 'Título',
            align: 'start',
            value: 'title',
          },
          { text: 'Categoría', value: 'topic.category' },
          { text: 'Tema', value: 'topic.name' },
          { value: 'actions', sortable: false },
        ],
        videos: [],
        showDialog: false
      }
    },
    computed: {
      ...mapGetters({
        token: 'token'
      })
    },
    methods: {
      show(param) {
        console.log(param)
      },
      editItem(video) {
        this.showDialog = true
      },
      deleteItem(video) {
        console.log('Borrar vídeo')
      },
      closeDialog() {
        console.log('cerrando')
        this.showDialog = false
      }
    },
    async created () {
      try {
        const result = await this.$store.dispatch('getAllVideos', this.token)
        this.videos = result
      } catch (error) {
        throw new Error (error)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>