<template>
  <div>
    <v-container class="header-wraper">
      <h1>Mensajes</h1>
    </v-container>
    <v-simple-table v-if="role === 'cliente'">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Pregunta</th>
            <th class="text-left">tipo</th>
            <th class="text-left">Estado</th>
            <th class="text-left">Mensaje Nuevo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, idx) in messages"
            :key="item._id"
            @click="goToQuestion(item.pregunta_id, idx)"
          >
            <td class="text-truncate" style="max-width: 150px;">
              {{ item.pregunta }}
            </td>
            <td class="text-truncate">{{ item.type }}</td>
            <td>
              <v-icon v-if="!item.respuesta_leida">mdi-check</v-icon>
              <v-icon v-else color="green">mdi-check-all</v-icon>
            </td>
            <td>
              <span v-if="item.respuesta_leida && !item.verificada">
                <v-icon color="green">
                  mdi-flag
                </v-icon>
              </span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-simple-table v-else>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Pregunta</th>
            <th class="text-left">Alumno</th>
            <th class="text-left">Respondido</th>
            <th class="text-left">Tipo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, idx) in messages"
            :key="item._id"
            @click="goToQuestion(item.pregunta_id, idx)"
          >
            <td
              v-if="item.respuesta_leida === false"
              class="text-truncate"
              style="max-width: 150px;"
            >
              {{ item.pregunta }}
            </td>
            <td
              v-if="!item.respuesta_leida"
              class="text-truncate"
              style="max-width: 150px;"
            >
              {{item.user_id ? `${item.user_id.name} ${item.user_id.lastName}` : 'Sin nombre'}}
            </td>
            <td v-if="item.respuesta_leida === false">
              <v-icon>mdi-check</v-icon>
            </td>
            <td v-if="item.respuesta_leida === false">{{ item.type }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['messages', 'role', 'userId'])
  },
  methods: {
    goToQuestion(question, idx) {
      if (this.messages[idx].respuesta_leida) {
        this.$store.dispatch('updateVerificada', this.messages[idx]._id)
      }
      this.$store.dispatch('savePosition', idx)
      this.$router.push(`/message/${question}`)
    }
  }
}
</script>

<style></style>
