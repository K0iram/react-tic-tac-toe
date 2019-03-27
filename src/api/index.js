import axios from 'axios'


export const signUp = (credentails) => {
  return axios.post('http://localhost:3000/api/Users', credentails)
}

export const signIn = (user) => {
  return axios.post('http://localhost:3000/api/Users/login', user)
}