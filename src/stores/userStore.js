import { defineStore } from 'pinia'
import { userService } from '../services/userService'

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [],
    loading: false,
    error: null,
    selectedUser: null
  }),

  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === parseInt(id))
    },
    
    totalUsers: (state) => state.users.length,
    
    isLoading: (state) => state.loading
  },

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      
      try {
        const users = await userService.getUsers()
        this.users = users.map(user => ({
          ...user,
          isLocal: false // Marcar como datos originales de la API
        }))
      } catch (error) {
        this.error = 'Error al cargar los usuarios'
        console.error('Error fetching users:', error)
      } finally {
        this.loading = false
      }
    },

    addUser(userData) {
      const newUser = {
        ...userData,
        id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id), 0) + 1 : 1,
        isLocal: true // Marcar como dato local
      }
      
      this.users.push(newUser)
      return newUser
    },

    updateUser(id, userData) {
      const index = this.users.findIndex(user => user.id === parseInt(id))
      
      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          ...userData,
          isLocal: true // Marcar como modificado localmente
        }
        return this.users[index]
      }
      
      return null
    },

    deleteUser(id) {
      const index = this.users.findIndex(user => user.id === parseInt(id))
      
      if (index !== -1) {
        const deletedUser = this.users[index]
        this.users.splice(index, 1)
        return deletedUser
      }
      
      return null
    },

    setSelectedUser(user) {
      this.selectedUser = user
    },

    clearSelectedUser() {
      this.selectedUser = null
    },

    clearError() {
      this.error = null
    }
  }
})