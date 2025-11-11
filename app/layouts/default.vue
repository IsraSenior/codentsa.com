<script setup>
const route = useRoute()

// Check if current page is home
const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <div>
    <Header />
    <!-- Breadcrumbs only on internal pages (not home) -->
    <Breadcrumbs v-if="!isHomePage" />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>