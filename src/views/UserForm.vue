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
                      {{ isEditMode ? 'Editar Usuario' : 'Nuevo Usuario' }}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 class="mt-2 text-2xl font-bold text-gray-900">
              {{ isEditMode ? `Editar: ${currentUser?.name || 'Usuario'}` : 'Crear Nuevo Usuario' }}
            </h1>
          </div>
          <RouterLink
            to="/users"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Volver
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form @submit="onSubmit" class="space-y-8">
        <!-- Personal Information -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Información Personal
            </h3>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">
                  Nombre completo *
                </label>
                <input
                  id="name"
                  v-model="name"
                  v-bind="nameAttrs"
                  type="text"
                  :class="[
                    'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                    hasErrors('name')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  ]"
                  placeholder="Ingresa el nombre completo"
                />
                <p v-if="hasErrors('name')" class="mt-2 text-sm text-red-600">
                  {{ getFieldError('name') }}
                </p>
              </div>

              <!-- Username -->
              <div>
                <label for="username" class="block text-sm font-medium text-gray-700">
                  Nombre de usuario *
                </label>
                <input
                  id="username"
                  v-model="username"
                  v-bind="usernameAttrs"
                  type="text"
                  :class="[
                    'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                    hasErrors('username')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  ]"
                  placeholder="Ingresa el nombre de usuario"
                />
                <p v-if="hasErrors('username')" class="mt-2 text-sm text-red-600">
                  {{ getFieldError('username') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Información de Contacto
            </h3>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  id="email"
                  v-model="email"
                  v-bind="emailAttrs"
                  type="email"
                  :class="[
                    'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                    hasErrors('email')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  ]"
                  placeholder="correo@ejemplo.com"
                />
                <p v-if="hasErrors('email')" class="mt-2 text-sm text-red-600">
                  {{ getFieldError('email') }}
                </p>
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">
                  Teléfono *
                </label>
                <input
                  id="phone"
                  v-model="phone"
                  v-bind="phoneAttrs"
                  type="tel"
                  :class="[
                    'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                    hasErrors('phone')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  ]"
                  placeholder="+1-555-555-5555"
                />
                <p v-if="hasErrors('phone')" class="mt-2 text-sm text-red-600">
                  {{ getFieldError('phone') }}
                </p>
              </div>

            </div>
          </div>
        </div>

        <!-- Address Information -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Dirección <span class="text-sm text-gray-400 font-normal">(campos opcionales)</span>
            </h3>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <!-- Street -->
              <div>
                <label for="addressStreet" class="block text-sm font-medium text-gray-700">
                  Calle
                </label>
                <input
                  id="addressStreet"
                  v-model="addressStreet"
                  v-bind="addressStreetAttrs"
                  type="text"
                  :class="[
                    'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                    hasErrors('address.street')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  ]"
                  placeholder="Calle Principal 123"
                />
                <p v-if="hasErrors('address.street')" class="mt-2 text-sm text-red-600">
                  {{ getFieldError('address.street') }}
                </p>
              </div>

              <!-- Suite -->
              <div>
                <label for="addressSuite" class="block text-sm font-medium text-gray-700">
                  Apartamento/Suite
                </label>
                <input
                  id="addressSuite"
                  v-model="addressSuite"
                  v-bind="addressSuiteAttrs"
                  type="text"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Apt. 4B"
                />
              </div>

              <!-- City -->
              <div>
                <label for="addressCity" class="block text-sm font-medium text-gray-700">
                  Ciudad
                </label>
                <input
                  id="addressCity"
                  v-model="addressCity"
                  v-bind="addressCityAttrs"
                  type="text"
                  :class="[
                    'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                    hasErrors('address.city')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  ]"
                  placeholder="Ciudad"
                />
                <p v-if="hasErrors('address.city')" class="mt-2 text-sm text-red-600">
                  {{ getFieldError('address.city') }}
                </p>
              </div>

              <!-- Zipcode -->
              <div>
                <label for="addressZipcode" class="block text-sm font-medium text-gray-700">
                  Código postal
                </label>
                <input
                  id="addressZipcode"
                  v-model="addressZipcode"
                  v-bind="addressZipcodeAttrs"
                  type="text"
                  :class="[
                    'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                    hasErrors('address.zipcode')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  ]"
                  placeholder="12345"
                />
                <p v-if="hasErrors('address.zipcode')" class="mt-2 text-sm text-red-600">
                  {{ getFieldError('address.zipcode') }}
                </p>
              </div>
            </div>

          </div>
        </div>

        <!-- Company Information -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Información de la Empresa <span class="text-sm text-gray-400 font-normal">(campos opcionales)</span>
            </h3>
            <div class="grid grid-cols-1 gap-6">
              <!-- Company Name -->
              <div>
                <label for="companyName" class="block text-sm font-medium text-gray-700">
                  Nombre de la empresa
                </label>
                <input
                  id="companyName"
                  v-model="companyName"
                  v-bind="companyNameAttrs"
                  type="text"
                  :class="[
                    'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                    hasErrors('company.name')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  ]"
                  placeholder="Empresa ABC S.A."
                />
                <p v-if="hasErrors('company.name')" class="mt-2 text-sm text-red-600">
                  {{ getFieldError('company.name') }}
                </p>
              </div>

              <!-- Catch Phrase -->
              <div>
                <label for="companyCatchPhrase" class="block text-sm font-medium text-gray-700">
                  Eslogan
                </label>
                <input
                  id="companyCatchPhrase"
                  v-model="companyCatchPhrase"
                  v-bind="companyCatchPhraseAttrs"
                  type="text"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Innovación y calidad"
                />
              </div>

              <!-- Business -->
              <div>
                <label for="companyBs" class="block text-sm font-medium text-gray-700">
                  Descripción del negocio
                </label>
                <textarea
                  id="companyBs"
                  v-model="companyBs"
                  v-bind="companyBsAttrs"
                  rows="3"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Descripción de los servicios o productos..."
                />
              </div>

              <!-- Website -->
              <div>
                <label for="website" class="block text-sm font-medium text-gray-700">
                  Sitio web <span class="text-gray-400">(opcional)</span>
                </label>
                <input
                  id="website"
                  v-model="website"
                  v-bind="websiteAttrs"
                  type="url"
                  :class="[
                    'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                    hasErrors('website')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  ]"
                  placeholder="https://ejemplo.com"
                />
                <p v-if="hasErrors('website')" class="mt-2 text-sm text-red-600">
                  {{ getFieldError('website') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex justify-end space-x-3">
              <RouterLink
                to="/users"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </RouterLink>
              <button
                type="submit"
                :disabled="!areRequiredFieldsValid() || submitting"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LoadingSpinner v-if="submitting" size="sm" class="mr-2" />
                {{ submitting ? 'Guardando...' : (isEditMode ? 'Actualizar Usuario' : 'Crear Usuario') }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import {
  UsersIcon,
  ChevronRightIcon,
  ArrowLeftIcon
} from '@heroicons/vue/24/outline'

import { useUsers } from '../composables/useUsers'
import { useUserValidation } from '../composables/useValidation'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const route = useRoute()
const { createUser, updateUser, getUserById } = useUsers()

// Form state
const submitting = ref(false)
const currentUser = ref(null)

// Edit mode check
const isEditMode = computed(() => !!route.params.id)

// Load user data if in edit mode
onMounted(async () => {
  if (isEditMode.value) {
    const userId = route.params.id
    currentUser.value = getUserById(userId)
    
    if (currentUser.value) {
      // Set form values for editing
      const formData = transformUserToForm(currentUser.value)
      console.log('Setting form values for editing:', formData)
      setValues(formData)
    }
  }
})

// Form validation
const {
  values,
  errors,
  fields,
  handleSubmit,
  setValues,
  hasErrors,
  getFieldError,
  isFormValid,
  areRequiredFieldsValid
} = useUserValidation(currentUser.value)

// Extract field bindings
const [name, nameAttrs] = fields.name
const [username, usernameAttrs] = fields.username
const [email, emailAttrs] = fields.email
const [phone, phoneAttrs] = fields.phone
const [website, websiteAttrs] = fields.website
const [addressStreet, addressStreetAttrs] = fields.addressStreet
const [addressSuite, addressSuiteAttrs] = fields.addressSuite
const [addressCity, addressCityAttrs] = fields.addressCity
const [addressZipcode, addressZipcodeAttrs] = fields.addressZipcode
const [companyName, companyNameAttrs] = fields.companyName
const [companyCatchPhrase, companyCatchPhraseAttrs] = fields.companyCatchPhrase
const [companyBs, companyBsAttrs] = fields.companyBs

// Transform user data to form format (for editing)
const transformUserToForm = (user) => {
  return {
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    website: user.website || '',
    'address.street': user.address?.street || '',
    'address.suite': user.address?.suite || '',
    'address.city': user.address?.city || '',
    'address.zipcode': user.address?.zipcode || '',
    'company.name': user.company?.name || '',
    'company.catchPhrase': user.company?.catchPhrase || '',
    'company.bs': user.company?.bs || ''
  }
}

// Transform form data to expected format
const transformFormData = (formValues) => {
  return {
    name: formValues.name,
    username: formValues.username,
    email: formValues.email,
    phone: formValues.phone,
    website: formValues.website || '',
    address: {
      street: formValues['address.street'] || '',
      suite: formValues['address.suite'] || '',
      city: formValues['address.city'] || '',
      zipcode: formValues['address.zipcode'] || '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    company: {
      name: formValues['company.name'] || '',
      catchPhrase: formValues['company.catchPhrase'] || '',
      bs: formValues['company.bs'] || ''
    }
  }
}

// Form submission
const onSubmit = handleSubmit(async (formValues) => {
  console.log('🔥 onSubmit called with values:', formValues)
  submitting.value = true
  
  try {
    const transformedData = transformFormData(formValues)
    console.log('📝 Transformed data:', transformedData)
    
    if (isEditMode.value) {
      console.log('✏️ Updating user...')
      await updateUser(route.params.id, transformedData)
    } else {
      console.log('➕ Creating new user...')
      await createUser(transformedData)
    }
    console.log('✅ User operation completed successfully')
  } catch (error) {
    console.error('❌ Error submitting form:', error)
  } finally {
    submitting.value = false
  }
}, (errors) => {
  console.log('🚫 Form validation errors:', errors)
})
</script>