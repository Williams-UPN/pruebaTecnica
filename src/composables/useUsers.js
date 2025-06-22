import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useNotificationStore } from '../stores/notificationStore'
import { useRouter } from 'vue-router'

export function useUsers() {
  const userStore = useUserStore()
  const notificationStore = useNotificationStore()
  const router = useRouter()

  const loading = ref(false)
  const deleting = ref(false)
  const selectedUsers = ref([])

  // Computed properties
  const users = computed(() => userStore.users)
  const totalUsers = computed(() => userStore.totalUsers)
  const isLoading = computed(() => userStore.isLoading || loading.value)

  // Load users
  const loadUsers = async () => {
    loading.value = true
    try {
      await userStore.fetchUsers()
      notificationStore.success('Usuarios cargados exitosamente')
    } catch (error) {
      notificationStore.error('Error al cargar los usuarios')
    } finally {
      loading.value = false
    }
  }

  // Create user
  const createUser = async (userData) => {
    try {
      const newUser = userStore.addUser(userData)
      notificationStore.success(`Usuario "${newUser.name}" creado exitosamente`)
      router.push('/users')
      return newUser
    } catch (error) {
      console.error('Error in createUser:', error)
      notificationStore.error('Error al crear el usuario')
      throw error
    }
  }

  // Update user
  const updateUser = async (id, userData) => {
    try {
      const updatedUser = userStore.updateUser(id, userData)
      if (updatedUser) {
        notificationStore.success(`Usuario "${updatedUser.name}" actualizado exitosamente`)
        router.push('/users')
        return updatedUser
      } else {
        throw new Error('Usuario no encontrado')
      }
    } catch (error) {
      notificationStore.error('Error al actualizar el usuario')
      throw error
    }
  }

  // Delete user
  const deleteUser = async (id) => {
    deleting.value = true
    try {
      const deletedUser = userStore.deleteUser(id)
      if (deletedUser) {
        notificationStore.success(`Usuario "${deletedUser.name}" eliminado exitosamente`)
        return deletedUser
      } else {
        throw new Error('Usuario no encontrado')
      }
    } catch (error) {
      notificationStore.error('Error al eliminar el usuario')
      throw error
    } finally {
      deleting.value = false
    }
  }

  // Delete multiple users
  const deleteSelectedUsers = async () => {
    if (selectedUsers.value.length === 0) {
      notificationStore.warning('No hay usuarios seleccionados')
      return
    }

    deleting.value = true
    try {
      const deletedCount = selectedUsers.value.length
      selectedUsers.value.forEach(userId => {
        userStore.deleteUser(userId)
      })
      
      selectedUsers.value = []
      notificationStore.success(`${deletedCount} usuario(s) eliminado(s) exitosamente`)
    } catch (error) {
      notificationStore.error('Error al eliminar los usuarios seleccionados')
      throw error
    } finally {
      deleting.value = false
    }
  }

  // Get user by ID
  const getUserById = (id) => {
    return userStore.getUserById(id)
  }

  // Select/Deselect users
  const toggleUserSelection = (userId) => {
    const index = selectedUsers.value.indexOf(userId)
    if (index > -1) {
      selectedUsers.value.splice(index, 1)
    } else {
      selectedUsers.value.push(userId)
    }
  }

  const selectAllUsers = () => {
    selectedUsers.value = users.value.map(user => user.id)
  }

  const deselectAllUsers = () => {
    selectedUsers.value = []
  }

  const isUserSelected = (userId) => {
    return selectedUsers.value.includes(userId)
  }

  const hasSelectedUsers = computed(() => selectedUsers.value.length > 0)
  const allUsersSelected = computed(() => 
    users.value.length > 0 && selectedUsers.value.length === users.value.length
  )

  // Auto-load users on mount
  onMounted(() => {
    if (users.value.length === 0) {
      loadUsers()
    }
  })

  return {
    // State
    users,
    loading,
    deleting,
    totalUsers,
    isLoading,
    selectedUsers,
    hasSelectedUsers,
    allUsersSelected,

    // Actions
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    deleteSelectedUsers,
    getUserById,
    
    // Selection
    toggleUserSelection,
    selectAllUsers,
    deselectAllUsers,
    isUserSelected
  }
}