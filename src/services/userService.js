import axios from 'axios'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth headers or other request modifications here
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'Error del servidor'
      throw new Error(`${error.response.status}: ${message}`)
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Error de conexión: No se pudo conectar al servidor')
    } else {
      // Something else happened
      throw new Error('Error inesperado: ' + error.message)
    }
  }
)

export const userService = {
  // Get all users
  async getUsers() {
    try {
      return await api.get('/users')
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      return await api.get(`/users/${id}`)
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error)
      throw error
    }
  },

  // Create user (simulated - JSONPlaceholder will return a fake response)
  async createUser(userData) {
    try {
      return await api.post('/users', userData)
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  },

  // Update user (simulated - JSONPlaceholder will return a fake response)
  async updateUser(id, userData) {
    try {
      return await api.put(`/users/${id}`, userData)
    } catch (error) {
      console.error(`Error updating user ${id}:`, error)
      throw error
    }
  },

  // Delete user (simulated - JSONPlaceholder will return a fake response)
  async deleteUser(id) {
    try {
      return await api.delete(`/users/${id}`)
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error)
      throw error
    }
  }
}