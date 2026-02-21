<script setup lang="ts">
const { appName } = useRuntimeConfig().public

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Dashboard', to: '/dashboard' },
]

const isMobileMenuOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
    <div class="container-fluid flex h-16 items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 text-xl font-bold text-primary-600">
        <span>🚀</span>
        <span>{{ appName }}</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-6 md:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300"
          active-class="!text-primary-600 font-semibold"
        >
          {{ link.label }}
        </NuxtLink>
        <BaseButton size="sm">Get Started</BaseButton>
      </nav>

      <!-- Mobile toggle -->
      <button
        class="rounded-md p-2 md:hidden"
        aria-label="Toggle menu"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <span class="block h-0.5 w-5 bg-gray-600 transition-all" :class="{ 'rotate-45 translate-y-1.5': isMobileMenuOpen }" />
        <span class="my-1 block h-0.5 w-5 bg-gray-600 transition-all" :class="{ 'opacity-0': isMobileMenuOpen }" />
        <span class="block h-0.5 w-5 bg-gray-600 transition-all" :class="{ '-rotate-45 -translate-y-1.5': isMobileMenuOpen }" />
      </button>
    </div>

    <!-- Mobile nav -->
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="container-fluid pb-4 md:hidden">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block py-2 text-sm text-gray-600"
          @click="isMobileMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
