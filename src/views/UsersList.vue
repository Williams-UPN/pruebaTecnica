<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <p class="mt-1 text-sm text-gray-500">
              Administra la lista de usuarios del sistema
            </p>
          </div>
          <div class="flex space-x-3">
            <button
              v-if="hasSelectedUsers"
              @click="showDeleteSelectedDialog = true"
              :disabled="deleting"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              <TrashIcon class="w-4 h-4 mr-2" />
              Eliminar Seleccionados ({{ selectedUsers.length }})
            </button>
            <RouterLink
              to="/users/new"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon class="w-4 h-4 mr-2" />
              Nuevo Usuario
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats -->
      <div class="mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <UsersIcon class="h-8 w-8 text-indigo-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total de usuarios
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ totalUsers }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="mb-6 bg-white p-4 rounded-lg shadow">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div class="flex-1 max-w-lg">
            <label for="search" class="sr-only">Buscar usuarios</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                placeholder="Buscar por nombre, email o empresa..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <button
            @click="loadUsers"
            :disabled="isLoading"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <ArrowPathIcon class="w-4 h-4 mr-2" :class="{ 'animate-spin': isLoading }" />
            Actualizar
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading && users.length === 0" class="text-center py-12">
        <LoadingSpinner size="lg" />
        <p class="mt-4 text-sm text-gray-500">Cargando usuarios...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!isLoading && filteredUsers.length === 0" class="text-center py-12">
        <UsersIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No hay usuarios</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ searchQuery ? 'No se encontraron usuarios que coincidan con tu búsqueda.' : 'Comienza creando un nuevo usuario.' }}
        </p>
        <div class="mt-6">
          <RouterLink
            to="/users/new"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon class="w-4 h-4 mr-2" />
            Nuevo Usuario
          </RouterLink>
        </div>
      </div>

      <!-- Users Table -->
      <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-3 border-b border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Lista de Usuarios
            </h3>
            <div class="flex items-center space-x-2">
              <button
                @click="allUsersSelected ? deselectAllUsers() : selectAllUsers()"
                class="text-sm text-indigo-600 hover:text-indigo-900"
              >
                {{ allUsersSelected ? 'Deseleccionar todos' : 'Seleccionar todos' }}
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    :checked="allUsersSelected"
                    @change="allUsersSelected ? deselectAllUsers() : selectAllUsers()"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    :id="`user-${user.id}`"
                    type="checkbox"
                    :checked="isUserSelected(user.id)"
                    @change="toggleUserSelection(user.id)"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ user.id }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ user.name }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ user.username }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ user.email }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ user.phone }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <RouterLink
                      :to="`/users/${user.id}`"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Ver
                    </RouterLink>
                    <RouterLink
                      :to="`/users/${user.id}/edit`"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </RouterLink>
                    <button
                      @click="showDeleteDialog(user)"
                      :disabled="deleting"
                      class="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      v-model="deleteDialogOpen"
      :title="deleteDialogTitle"
      :message="deleteDialogMessage"
      :loading="deleting"
      confirm-text="Eliminar"
      confirm-class="bg-red-600 hover:bg-red-700 focus:ring-red-500"
      @confirm="confirmDelete"
    />

    <!-- Delete Selected Confirmation Dialog -->
    <ConfirmDialog
      v-model="showDeleteSelectedDialog"
      title="Eliminar usuarios seleccionados"
      :message="`¿Estás seguro de que quieres eliminar ${selectedUsers.length} usuario(s) seleccionado(s)? Esta acción no se puede deshacer.`"
      :loading="deleting"
      confirm-text="Eliminar"
      confirm-class="bg-red-600 hover:bg-red-700 focus:ring-red-500"
      @confirm="confirmDeleteSelected"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  PlusIcon,
  TrashIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon
} from '@heroicons/vue/24/outline'

import { useUsers } from '../composables/useUsers'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import ConfirmDialog from '../components/ui/ConfirmDialog.vue'

// Composables
const {
  users,
  isLoading,
  deleting,
  totalUsers,
  selectedUsers,
  hasSelectedUsers,
  allUsersSelected,
  loadUsers,
  deleteUser,
  deleteSelectedUsers,
  toggleUserSelection,
  selectAllUsers,
  deselectAllUsers,
  isUserSelected
} = useUsers()

// Local state
const searchQuery = ref('')
const deleteDialogOpen = ref(false)
const showDeleteSelectedDialog = ref(false)
const userToDelete = ref(null)

// Computed
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.company?.name?.toLowerCase().includes(query) ||
    user.username.toLowerCase().includes(query)
  )
})

const deleteDialogTitle = computed(() => {
  return userToDelete.value ? `Eliminar usuario: ${userToDelete.value.name}` : 'Eliminar usuario'
})

const deleteDialogMessage = computed(() => {
  return userToDelete.value 
    ? `¿Estás seguro de que quieres eliminar a ${userToDelete.value.name}? Esta acción no se puede deshacer.`
    : '¿Estás seguro de que quieres eliminar este usuario?'
})

// Methods
const showDeleteDialog = (user) => {
  userToDelete.value = user
  deleteDialogOpen.value = true
}

const confirmDelete = async () => {
  if (userToDelete.value) {
    await deleteUser(userToDelete.value.id)
    userToDelete.value = null
    deleteDialogOpen.value = false
  }
}

const confirmDeleteSelected = async () => {
  await deleteSelectedUsers()
  showDeleteSelectedDialog.value = false
}
</script>