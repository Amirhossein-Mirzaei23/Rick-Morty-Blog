<template>
  <div class="flex min-h-screen flex-col">
    <TheHeader />

    <main class="container-fluid flex-1 py-8">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
