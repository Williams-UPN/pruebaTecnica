import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),

  actions: {
    addNotification(notification) {
      const id = Date.now() + Math.random()
      const newNotification = {
        id,
        type: 'info', // info, success, warning, error
        title: '',
        message: '',
        duration: 5000,
        ...notification
      }

      this.notifications.push(newNotification)

      // Auto remove notification
      if (newNotification.duration > 0) {
        setTimeout(() => {
          this.removeNotification(id)
        }, newNotification.duration)
      }

      return id
    },

    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },

    success(message, title = 'Éxito') {
      return this.addNotification({
        type: 'success',
        title,
        message
      })
    },

    error(message, title = 'Error') {
      return this.addNotification({
        type: 'error',
        title,
        message,
        duration: 7000
      })
    },

    warning(message, title = 'Advertencia') {
      return this.addNotification({
        type: 'warning',
        title,
        message
      })
    },

    info(message, title = 'Información') {
      return this.addNotification({
        type: 'info',
        title,
        message
      })
    },

    clearAll() {
      this.notifications = []
    }
  }
})