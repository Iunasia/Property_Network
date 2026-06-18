import api from './api'

const register = async (role, data) => {
  const response = await api.post(`/auth/register/${role}`, data)
  return response.data
}

const login = async (role, data) => {
  const response = await api.post(`/auth/login/${role}`, data)
  return response.data
}

export default { register, login }