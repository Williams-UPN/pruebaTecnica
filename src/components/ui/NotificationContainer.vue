<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
  >
    <div class="flex w-full flex-col items-center space-y-3 sm:items-end">
      <TransitionGroup
        name="notification"
        tag="div"
        class="w-full max-w-md space-y-3"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="transform translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="transform translate-x-0 opacity-100"
        leave-to-class="transform translate-x-full opacity-0"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'pointer-events-auto w-full rounded-xl px-4 py-3 shadow-sm backdrop-blur-lg',
            {
              'bg-green-50/90 border border-green-200/50': notification.type === 'success',
              'bg-yellow-50/90 border border-yellow-200/50': notification.type === 'warning',
              'bg-red-50/90 border border-red-200/50': notification.type === 'error',
              'bg-blue-50/90 border border-blue-200/50': notification.type === 'info'
            }
          ]"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3 flex-1">
              <!-- Icono simplificado -->
              <div :class="[
                'flex-shrink-0 w-1 h-8 rounded-full',
                {
                  'bg-green-500': notification.type === 'success',
                  'bg-yellow-500': notification.type === 'warning',
                  'bg-red-500': notification.type === 'error',
                  'bg-blue-500': notification.type === 'info'
                }
              ]"></div>
              
              <!-- Contenido -->
              <div class="flex-1 min-w-0">
                <p :class="[
                  'text-sm font-medium',
                  {
                    'text-green-900': notification.type === 'success',
                    'text-yellow-900': notification.type === 'warning',
                    'text-red-900': notification.type === 'error',
                    'text-blue-900': notification.type === 'info'
                  }
                ]">
                  {{ notification.title }}
                </p>
                <p v-if="notification.message" :class="[
                  'mt-0.5 text-sm',
                  {
                    'text-green-700': notification.type === 'success',
                    'text-yellow-700': notification.type === 'warning',
                    'text-red-700': notification.type === 'error',
                    'text-blue-700': notification.type === 'info'
                  }
                ]">
                  {{ notification.message }}
                </p>
              </div>
            </div>
            
            <!-- Botón de cerrar -->
            <button
              type="button"
              :class="[
                'ml-4 flex-shrink-0 rounded-lg p-1.5 transition-colors',
                {
                  'hover:bg-green-200/50 text-green-600': notification.type === 'success',
                  'hover:bg-yellow-200/50 text-yellow-600': notification.type === 'warning',
                  'hover:bg-red-200/50 text-red-600': notification.type === 'error',
                  'hover:bg-blue-200/50 text-blue-600': notification.type === 'info'
                }
              ]"
              @click="removeNotification(notification.id)"
            >
              <span class="sr-only">Cerrar</span>
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Barra de progreso minimalista -->
          <div
            v-if="notification.duration > 0"
            class="mt-2 h-0.5 bg-black/5 rounded-full overflow-hidden"
          >
            <div
              :class="[
                'h-full rounded-full transition-all ease-linear',
                {
                  'bg-green-500': notification.type === 'success',
                  'bg-yellow-500': notification.type === 'warning',
                  'bg-red-500': notification.type === 'error',
                  'bg-blue-500': notification.type === 'info'
                }
              ]"
              :style="{
                animation: `shrink ${notification.duration}ms linear forwards`
              }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotificationStore } from '../../stores/notificationStore'

const notificationStore = useNotificationStore()

const notifications = computed(() => notificationStore.notifications)

const removeNotification = (id) => {
  notificationStore.removeNotification(id)
}
</script>

<style scoped>
@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}
</style>