<script setup>
const config = useRuntimeConfig()
const maintenanceEnabled = String(config.public.maintenanceEnabled) === 'true'
const accessCookie = useCookie('maintenance-access', { maxAge: 60 * 60 * 24 * 7 })
const showMaintenance = ref(maintenanceEnabled && accessCookie.value !== 'granted')

const showAccessModal = ref(false)
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
    showAccessModal.value = false
  } catch {
    error.value = 'Clave incorrecta. Intentalo de nuevo.'
    accessKey.value = ''
  } finally {
    loading.value = false
  }
}

function openAccessModal() {
  showAccessModal.value = true
  error.value = ''
  accessKey.value = ''
}
</script>

<template>
  <div v-if="showMaintenance">
    <PrelaunchLanding @request-access="openAccessModal" />

    <!-- Modal de acceso dev -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showAccessModal"
          class="fixed inset-0 z-50 flex items-center justify-center px-5"
        >
          <div
            class="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            @click="showAccessModal = false"
          ></div>

          <div class="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
            <button
              type="button"
              class="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 transition-colors"
              aria-label="Cerrar"
              @click="showAccessModal = false"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 class="font-title text-xl font-bold text-neutral-900 mb-2">Acceso autorizado</h2>
            <p class="font-body text-sm text-neutral-600 mb-6">
              Introduce tu clave para acceder al sitio completo.
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
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>

  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
