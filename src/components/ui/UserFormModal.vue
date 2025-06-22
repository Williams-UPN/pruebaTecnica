<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
              <!-- Modal Header -->
              <div class="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  {{ isEditMode ? `Editar: ${editUser?.name || 'Usuario'}` : 'Crear Nuevo Usuario' }}
                </DialogTitle>
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="closeModal"
                >
                  <span class="sr-only">Cerrar</span>
                  <XMarkIcon class="h-6 w-6" />
                </button>
              </div>

              <!-- Form Content -->
              <form @submit="onSubmit" class="space-y-6">
                <!-- Personal Information -->
                <div>
                  <h4 class="text-base font-medium text-gray-900 mb-4">
                    Información Personal
                  </h4>
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      <p v-if="hasErrors('name')" class="mt-1 text-sm text-red-600">
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
                      <p v-if="hasErrors('username')" class="mt-1 text-sm text-red-600">
                        {{ getFieldError('username') }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Contact Information -->
                <div>
                  <h4 class="text-base font-medium text-gray-900 mb-4">
                    Información de Contacto
                  </h4>
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      <p v-if="hasErrors('email')" class="mt-1 text-sm text-red-600">
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
                      <p v-if="hasErrors('phone')" class="mt-1 text-sm text-red-600">
                        {{ getFieldError('phone') }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Address Information (Optional) -->
                <div>
                  <h4 class="text-base font-medium text-gray-900 mb-2">
                    Dirección 
                    <span class="text-sm text-gray-400 font-normal">(campos opcionales)</span>
                  </h4>
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Calle Principal 123"
                      />
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
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Ciudad"
                      />
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
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>

                <!-- Company Information (Optional) -->
                <div>
                  <h4 class="text-base font-medium text-gray-900 mb-2">
                    Información de la Empresa 
                    <span class="text-sm text-gray-400 font-normal">(campos opcionales)</span>
                  </h4>
                  <div class="grid grid-cols-1 gap-4">
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
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Empresa ABC S.A."
                      />
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
                        rows="2"
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
                      <p v-if="hasErrors('website')" class="mt-1 text-sm text-red-600">
                        {{ getFieldError('website') }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Form Actions -->
                <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="closeModal"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    :disabled="!areRequiredFieldsValid() || submitting"
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LoadingSpinner v-if="submitting" size="sm" class="mr-2" />
                    {{ submitting ? 'Guardando...' : (isEditMode ? 'Actualizar Usuario' : 'Crear Usuario') }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

import { useUserValidation } from '../../composables/useValidation'
import LoadingSpinner from './LoadingSpinner.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  editUser: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'submit'])

// Local state
const submitting = ref(false)

// Edit mode check
const isEditMode = computed(() => !!props.editUser)

// Form validation with initial values
const {
  values,
  errors,
  fields,
  handleSubmit,
  setValues,
  resetForm,
  hasErrors,
  getFieldError,
  areRequiredFieldsValid
} = useUserValidation(props.editUser)

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

// Watch for editUser changes to populate form
watch(() => props.editUser, (newUser) => {
  if (newUser) {
    const formData = transformUserToForm(newUser)
    setValues(formData)
  } else {
    resetForm()
  }
}, { immediate: true })

// Transform user data to form format
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
  submitting.value = true
  
  try {
    const transformedData = transformFormData(formValues)
    
    // Emit the submit event with data and mode
    emit('submit', {
      data: transformedData,
      isEdit: isEditMode.value,
      userId: props.editUser?.id
    })
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    submitting.value = false
  }
}, (errors) => {
  console.log('🚫 Form validation errors:', errors)
})

// Close modal
const closeModal = () => {
  if (!submitting.value) {
    resetForm()
    emit('close')
  }
}
</script>