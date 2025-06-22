<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <nav class="flex" aria-label="Breadcrumb">
              <ol class="flex items-center space-x-4">
                <li>
                  <RouterLink to="/users" class="text-gray-400 hover:text-gray-500">
                    <UsersIcon class="flex-shrink-0 h-5 w-5" />
                    <span class="sr-only">Usuarios</span>
                  </RouterLink>
                </li>
                <li>
                  <div class="flex items-center">
                    <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" />
                    <span class="ml-4 text-sm font-medium text-gray-500">
                      Detalle del Usuario
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 class="mt-2 text-2xl font-bold text-gray-900">
              {{ user?.name || 'Usuario' }}
            </h1>
          </div>
          <div class="flex space-x-3">
            <RouterLink
              to="/users"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeftIcon class="w-4 h-4 mr-2" />
              Volver
            </RouterLink>
            <RouterLink
              v-if="user"
              :to="`/users/${user.id}/edit`"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PencilIcon class="w-4 h-4 mr-2" />
              Editar
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="!user" class="text-center py-12">
        <div class="text-red-600">
          <ExclamationTriangleIcon class="mx-auto h-12 w-12" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">Usuario no encontrado</h3>
          <p class="mt-1 text-sm text-gray-500">
            El usuario que buscas no existe o ha sido eliminado.
          </p>
          <div class="mt-6">
            <RouterLink
              to="/users"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Volver a la lista
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- User Details -->
      <div v-else class="space-y-8">
        <!-- Personal Information -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 flex justify-between items-start">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Información Personal
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Datos personales y de contacto del usuario.
              </p>
            </div>
            <span
              v-if="user.isLocal"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              Usuario Local
            </span>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Nombre completo</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.name }}</dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Nombre de usuario</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.username }}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a :href="`mailto:${user.email}`" class="text-indigo-600 hover:text-indigo-900">
                    {{ user.email }}
                  </a>
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Teléfono</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a :href="`tel:${user.phone}`" class="text-indigo-600 hover:text-indigo-900">
                    {{ user.phone }}
                  </a>
                </dd>
              </div>
              <div v-if="user.website" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Sitio web</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a :href="formatWebsite(user.website)" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:text-indigo-900">
                    {{ user.website }}
                    <ArrowTopRightOnSquareIcon class="inline w-4 h-4 ml-1" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Address Information -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Dirección
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Información de ubicación del usuario.
            </p>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Dirección completa</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formatAddress(user.address) }}
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Ciudad</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.address?.city }}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Código postal</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.address?.zipcode }}</dd>
              </div>
              <div v-if="user.address?.geo?.lat && user.address?.geo?.lng" class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Coordenadas</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ user.address.geo.lat }}, {{ user.address.geo.lng }}
                  <a
                    :href="`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="ml-2 text-indigo-600 hover:text-indigo-900"
                  >
                    Ver en Google Maps
                    <ArrowTopRightOnSquareIcon class="inline w-4 h-4 ml-1" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Company Information -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Información de la Empresa
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Datos sobre la empresa donde trabaja el usuario.
            </p>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Nombre de la empresa</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.company?.name || 'No especificado' }}</dd>
              </div>
              <div v-if="user.company?.catchPhrase" class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Eslogan</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.company.catchPhrase }}</dd>
              </div>
              <div v-if="user.company?.bs" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Descripción del negocio</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.company.bs }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex justify-end space-x-3">
              <button
                @click="showDeleteDialog = true"
                class="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50"
              >
                <TrashIcon class="w-4 h-4 mr-2" />
                Eliminar Usuario
              </button>
              <RouterLink
                :to="`/users/${user.id}/edit`"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <PencilIcon class="w-4 h-4 mr-2" />
                Editar Usuario
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      :title="`Eliminar usuario: ${user?.name}`"
      :message="`¿Estás seguro de que quieres eliminar a ${user?.name}? Esta acción no se puede deshacer.`"
      :loading="deleting"
      confirm-text="Eliminar"
      confirm-class="bg-red-600 hover:bg-red-700 focus:ring-red-500"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import {
  UsersIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

import { useUsers } from '../composables/useUsers'
import ConfirmDialog from '../components/ui/ConfirmDialog.vue'

const route = useRoute()
const router = useRouter()
const { getUserById, deleteUser } = useUsers()

// Local state
const user = ref(null)
const showDeleteDialog = ref(false)
const deleting = ref(false)

// Load user data
onMounted(() => {
  const userId = route.params.id
  user.value = getUserById(userId)
})

// Helper functions
const formatAddress = (address) => {
  if (!address) return 'No especificado'
  
  const parts = [
    address.street,
    address.suite,
    address.city,
    address.zipcode
  ].filter(Boolean)
  
  return parts.join(', ')
}

const formatWebsite = (website) => {
  if (!website) return ''
  return website.startsWith('http') ? website : `https://${website}`
}

// Delete user
const confirmDelete = async () => {
  if (!user.value) return
  
  deleting.value = true
  try {
    await deleteUser(user.value.id)
    showDeleteDialog.value = false
    router.push('/users')
  } catch (error) {
    console.error('Error deleting user:', error)
  } finally {
    deleting.value = false
  }
}
</script>