<script setup>
const config = useRuntimeConfig()
const maintenanceEnabled = String(config.public.maintenanceEnabled) === 'true'
const accessCookie = useCookie('maintenance-access', { maxAge: 60 * 60 * 24 * 7 })
const showMaintenance = ref(maintenanceEnabled && accessCookie.value !== 'granted')

const accessKey = ref('')
const error = ref('')
const loading = ref(false)

async function submitKey() {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/verify-maintenance-access', {
      method: 'POST',
      body: { key: accessKey.value },
    })
    accessCookie.value = 'granted'
    showMaintenance.value = false
  } catch (e) {
    error.value = 'Clave incorrecta. Intentalo de nuevo.'
    accessKey.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="showMaintenance" class="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-5">
    <div class="w-full max-w-md text-center">
      <Logo color="text-primary" class="mx-auto mb-8 w-48" />

      <h1 class="font-title text-3xl font-bold text-neutral-900 mb-3">
        Sitio en construccion
      </h1>

      <p class="font-body text-neutral-600 mb-8">
        Estamos construyendo algo nuevo. Si tienes acceso autorizado, introduce tu clave a
        continuacion.
      </p>

      <form class="space-y-4" @submit.prevent="submitKey">
        <input
          v-model="accessKey"
          type="password"
          placeholder="Clave de acceso"
          class="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white font-body text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        />

        <p v-if="error" class="text-error text-sm font-body">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-3 bg-primary-500 text-white font-body font-semibold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Verificando...' : 'Acceder' }}
        </button>
      </form>

      <div class="mt-10 pt-6 border-t border-neutral-200">
        <p class="font-body text-sm text-neutral-500 mb-1">
          Contacto: <a href="mailto:soporte@codentsa.com" class="text-primary-500 hover:underline">soporte@codentsa.com</a>
        </p>
        <p class="font-body text-sm text-neutral-500">
          Tel: <a href="tel:900000000" class="text-primary-500 hover:underline">900 000 000</a>
        </p>
      </div>
    </div>

    <footer class="absolute bottom-5 font-body text-xs text-neutral-400">
      &copy; {{ new Date().getFullYear() }} Codentsa. Todos los derechos reservados.
    </footer>
  </div>

  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>
