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

<style>
/* Page transitions with fade and blur */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  filter: blur(4px);
}

.page-enter-to {
  opacity: 1;
  filter: blur(0);
}

.page-leave-from {
  opacity: 1;
  filter: blur(0);
}

.page-leave-to {
  opacity: 0;
  filter: blur(4px);
}
</style>