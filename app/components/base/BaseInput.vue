<script setup lang="ts">
/**
 * BaseInput – accessible text input primitive.
 * Use v-model to bind value.
 */
interface Props {
  /** Input id (also sets aria label target) */
  id?: string
  /** Label text */
  label?: string
  /** Placeholder */
  placeholder?: string
  /** HTML input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  /** Hint text shown below input */
  hint?: string
  /** Error message – sets aria-invalid */
  error?: string
  /** Disabled state */
  disabled?: boolean
  /** Required field */
  required?: boolean
}

const {
  id = useId(),
  type = 'text',
  disabled = false,
  required = false,
} = defineProps<Props>()

const model = defineModel<string>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      class="text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="ml-0.5 text-red-500" aria-hidden="true">*</span>
    </label>

    <!-- Input -->
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
      class="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': error }"
    />

    <!-- Error message -->
    <p v-if="error" :id="`${id}-error`" class="text-xs text-red-600 dark:text-red-400">
      {{ error }}
    </p>
    <!-- Hint -->
    <p v-else-if="hint" :id="`${id}-hint`" class="text-xs text-gray-500 dark:text-gray-400">
      {{ hint }}
    </p>
  </div>
</template>
