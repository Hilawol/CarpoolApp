import axios from 'axios'
const api = axios.create({
  baseURL: 'https:/carpool-il.herokuapp.com/api/',
  // baseURL: 'http://localhost:5000/api/',
})

export default api