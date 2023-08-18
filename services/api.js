import axios from '~/plugins/axios'

export default {
  getAllUsers() {
    return axios.get('users').then(response => response.data)
  },
  getAllTemas() {
    return axios.get('temario/todos').then(response => response.data)
  },
  AllTemas() {
    return axios.get('temario/all').then(response => response.data)
  },
  getAllTest() {
    return axios.get('tests/').then(response => response.data)
  },
  getUserById(user_id) {
    return axios.get('users/' + user_id).then(response => response.data)
  },
  getUserByEmail(user_email) {
    return axios
      .get('users/email/' + user_email)
      .then(response => response.data)
  },
  getQuestionById(pregunta_id) {
    return axios.get('questions/' + pregunta_id).then(response => response.data)
  },
  getAllQuestions() {
    return axios.get('questions').then(response => response.data)
  },
  getAllTestById(userId) {
    return axios.get('tests/user/me/' + userId).then(response => response.data)
  },
  generateTest(token) {
    return axios.post('tests', null, { headers: { token } }).then(response => {
      return response.data
    })
    // console.log(data)
    // return axios.post('tests', data).then(response => {
    //   return response.data
    // })
  },
  generateTest2(data) {
    console.log(data)
    return axios.post('tests', data).then(response => {
      return response.data
    })
  },
  generateConfigTest(token, test) {
    return axios
      .post('tests/config', test, { headers: { token } })
      .then(response => {
        return response.data
      })
  },
  updateTest(token, data) {
    return axios
      .put('tests/' + data.testId, data, { headers: { token } })
      .then(response => {
        return response.data
      })
  },
  getAllMessageById(userId) {
    return axios.get('messages/' + userId).then(response => response.data)
  },
  getAllMessageAdmin() {
    return axios.get('messages/').then(response => response.data)
  },
  newMessage(token, data) {
    return axios
      .post('messages/', data, { headers: { token } })
      .then(response => {
        return response.data
      })
  },
  getTest(testId) {
    return axios.get('tests/' + testId).then(response => response.data)
  },
  getAllTemasNames() {
    return axios
      .get('temario/todos')
      .then(response => response.data)
      .then(temas => {
        var temaName = []
        temas.forEach(tema => {
          let temaData = {
            name: tema.name,
            id: tema._id,
            visible: tema.visible
          }
          temaName.push(temaData)
        })
        return temaName.sort()
      })
  },
  login(user) {
    return axios.post('auth/login', user).then(response => response.data)
  },
  signup(user) {
    return axios.post('auth/signup', user).then(response => response.data)
  },
  updateName(data) {
    let body = {
      name: data.newName
    }
    console.log(data)
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  updateLastName(data) {
    let body = {
      lastName: data.newLastName
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  updatePhoto(data) {
    let body = {
      img_url: data.newPhoto
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  updateNickName(data) {
    let body = {
      nickName: data.newNickName
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  updateEmail(data) {
    let body = {
      email: data.newEmail
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  updatePhone(data) {
    let body = {
      phone: data.newPhone
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  updateSuscription(data) {
    let body = {
      suscription_type: data.newSuscription
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  newTema(body) {
    return axios.post('temario/crear', body).then(response => response.data)
  },
  deleteTema(temaId) {
    return axios.delete(`temario/${temaId}`).then(response => response.data)
  },
  reply(reply) {
    const body = {
      respuesta_leida: true,
      respuesta: reply.respuesta
    }
    return axios
      .put(`messages/${reply.id}`, body)
      .then(response => response.data)
  },
  crearQuestion(newQuestion) {
    console.log(newQuestion)
    return axios.post(`questions/`, newQuestion).then(response => response.data)
  },
  updateEnunciado(newEnunciado) {
    const body = {
      enunciado: newEnunciado.enunciado
    }

    return axios
      .put('questions/' + newEnunciado.id, body)
      .then(response => response.data)
  },
  updateQuestionPhoto(photo) {
    const body = {
      imagen_url: photo.imagen_url
    }

    return axios
      .put('questions/' + photo.id, body)
      .then(response => response.data)
  },
  updateOpcion(newOpcion) {
    console.log('lolo3')
    const body = {
      answers: newOpcion.answers
    }
    return axios
      .put('questions/' + newOpcion.id, body)
      .then(response => response.data)
  },
  updateExplicacion(explicacion) {
    const body = {
      explicacion: explicacion.explicacion
    }
    return axios
      .put('questions/' + explicacion.id, body)
      .then(response => response.data)
  },
  updateCorrect(correct) {
    const body = {
      answers_correct: correct.answers_correct
    }
    return axios
      .put('questions/' + correct.id, body)
      .then(response => response.data)
  },
  updateCategory(category) {
    const body = {
      category: category.category
    }
    return axios
      .put('questions/' + category.id, body)
      .then(response => response.data)
  },
  updateDifficulty(difficulty) {
    const body = {
      difficulty: difficulty.difficulty
    }
    return axios
      .put('questions/' + difficulty.id, body)
      .then(response => response.data)
  },
  updateTema(tema) {
    const body = {
      tema_id: tema.tema_id
    }
    return axios
      .put('questions/' + tema.id, body)
      .then(response => response.data)
  },
  activarTema(tema) {
    const body = {
      visible: tema.visible
    }
    return axios
      .put('temario/' + tema._id, body)
      .then(response => response.data)
  },
  change_active(change) {
    const body = {
      active: change.active,
      suscription_end_active: new Date().getTime() + 2629750000,
      role: 'cliente'
    }

    return axios.put('users/' + change.id, body).then(response => response.data)
  },
  change_suscription(change) {
    const body = {
      suscription_type: change.suscription_type
    }

    return axios.put('users/' + change.id, body).then(response => response.data)
  },
  updateVerificada(id) {
    const body = { verificada: true }

    return axios.put(`messages/${id}`, body).then(response => response.data)
  },
  crearExamen(test) {
    return axios.post('tests/exam', test).then(response => {
      return response.data
    })
  },
  deleteDesafio() {
    return axios.delete('tests/desafio').then(response => {
      return response.data
    })
  },
  updateQuestionById(newQuestion) {
    return axios
      .put('questions/' + newQuestion._id, newQuestion)
      .then(response => response.data)
  },
  testPremium() {
    return axios.get(`tests/premium`).then(response => response.data)
  },
  getAllSuscription() {
    return axios.get(`suscription/`).then(response => response.data)
  },
  putSuscription(update) {
    let body = {
      name: update.name,
      precio: update.precio,
      apartado1: update.apartado1,
      apartado2: update.apartado2,
      apartado3: update.apartado3,
      apartado4: update.apartado4
    }
    return axios
      .put(`suscription/${update.id}`, body)
      .then(response => response.data)
  },
  getAllLocalizacion() {
    return axios.get(`localizacion/`).then(response => response.data)
  },
  putLocalizacion(localizacion) {
    const body = {
      telefono: localizacion.telefono,
      correo: localizacion.correo,
      direccion: localizacion.direccion
    }
    return axios
      .put(`localizacion/${localizacion.id}`, body)
      .then(response => response.data)
  },
  paymentBasic() {
    return axios.get('/paymentStripe/basic').then(response => response.data)
  },
  paymentPro() {
    return axios.get('/paymentStripe/pro').then(response => response.data)
  },
  paymentPremium() {
    return axios.get('/paymentStripe/premium').then(response => response.data)
  },
  suscription_end_active(change) {
    const body = {
      role: 'cliente',
      active: change.active,
      suscription_end_active: new Date().getTime() + 2629750000
    }

    return axios.put('users/' + change.id, body).then(response => response.data)
  },
  getByTestId(id) {
    return axios.get('/tests/' + id).then(response => response.data)
  },
  updateDeberes(id) {
    let body = {
      deberes: false
    }
    return axios
      .put(`tests/deberes/${id}`, body)
      .then(response => response.data)
  },
  updateNota(datos) {
    let body = {
      nota: datos.nota
    }
    return axios
      .put(`tests/nota/${datos.id}`, body)
      .then(response => response.data)
  },
  getURL() {
    return axios.get('/url_clase').then(response => response.data)
  },
  putURL(dato) {
    let body = {
      direccion: dato.direccion,
      contraseña: dato.contraseña
    }
    return axios
      .put(`url_clase/${dato.id}`, body)
      .then(response => response.data)
  },
  reload(data) {
    let body = {
      testCheck: data.testCheck,
      respuestas: data.respuestas
    }
    return axios.put('tests/reload/' + data._id, body).then(response => {
      return response.data
    })
  },
  sendEmail(data) {
    // return axios.post('correo/find', data).then(response => response.data)
    return axios.post('users/reset_pass', data).then(response => response.data)
  },
  new_pass(data) {
    let token = data.token

    return axios
      .post('users/new_pass', data, { headers: { token } })
      .then(response => response.data)
  },
  getQuestion(data) {
    return axios
      .post('questions/especifico', data)
      .then(response => response.data)
  },
  getByTest(data) {
    return axios.get('tests/' + data._id).then(response => response.data)
  },
  deleteUser(data) {
    return axios.delete('users/' + data).then(response => {
      return response.data
    })
  },
  post_pdf(data) {
    return axios.post('pdf/', data).then(response => response.data)
  },
  giveQuestion(data) {
    console.log(data)
    const body = {
      category: data
    }
    return axios.post('questions/give', body).then(response => response.data)
  },
  filtrarQuestion(data) {
    return axios.post('questions/filtrar', data).then(response => response.data)
  },
  getPdf(data) {
    return axios.post('pdf/find', data).then(response => response.data)
  },
  deletePdf(data) {
    return axios.delete(`pdf/${data}`).then(response => response.data)
  },
  myCurrentTest(data) {
    return axios.get('tests/prueba/' + data).then(response => response.data)
  },
  getAllVideos(token) {
    return axios.get('video', { headers: { token } }).then(response => response.data)
  },
  async updateVideo(body, token) {
    const result = await axios.put(`video/${body.id}`, body.body, { headers: { token } })
    return result.data
  }
}
