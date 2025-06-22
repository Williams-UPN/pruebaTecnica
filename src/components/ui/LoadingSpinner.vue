<template>
  <div class="flex justify-center items-center">
    <div
      :class="[
        'animate-spin rounded-full border-solid border-indigo-600',
        sizeClasses,
        'border-t-transparent border-r-transparent'
      ]"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
    xl: 'h-12 w-12 border-4'
  }
  return sizes[props.size]
})
</script>