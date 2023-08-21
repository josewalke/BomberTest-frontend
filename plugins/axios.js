import axios from 'axios'

export default axios.create({
  baseURL: 'https://bomber-test-backend-production.up.railway.app/api/'
})
