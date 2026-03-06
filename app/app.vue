<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const maintenanceEnabled = String(config.public.maintenanceEnabled) === 'true'
const accessCookie = useCookie('maintenance-access', { maxAge: 60 * 60 * 24 * 7 })

const legalRoutes = ['/politicas-privacidad', '/terminos-condiciones', '/aviso-legal']
const isLegalRoute = computed(() => legalRoutes.includes(route.path))
const isMaintenanceActive = computed(
  () => maintenanceEnabled && accessCookie.value !== 'granted',
)
const showMaintenance = computed(() => isMaintenanceActive.value && !isLegalRoute.value)
const layoutName = computed(() =>
  isMaintenanceActive.value && isLegalRoute.value ? 'blank' : 'default',
)

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
    closeAccessModal()
  } catch {
    error.value = 'Clave incorrecta. Intentalo de nuevo.'
    accessKey.value = ''
  } finally {
    loading.value = false
  }
}

const previousFocus = ref(null)

function openAccessModal() {
  previousFocus.value = document.activeElement
  showAccessModal.value = true
  error.value = ''
  accessKey.value = ''
  nextTick(() => {
    const input = document.getElementById('access-key-input')
    if (input) input.focus()
  })
}

function closeAccessModal() {
  showAccessModal.value = false
  if (previousFocus.value) {
    nextTick(() => previousFocus.value?.focus())
  }
}

function handleModalKeydown(e) {
  if (e.key === 'Escape') {
    closeAccessModal()
    return
  }
  if (e.key !== 'Tab') return

  const modal = e.currentTarget
  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault()
      last.focus()
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}
</script>

<template>
  <!-- Maintenance: landing page -->
  <div v-if="showMaintenance">
    <PrelaunchLanding @request-access="openAccessModal" />
  </div>

  <!-- Normal site or legal pages during maintenance -->
  <NuxtLayout v-else :name="layoutName">
    <NuxtPage />
  </NuxtLayout>

  <!-- Hidden NuxtPage to satisfy Nuxt check during maintenance -->
  <div v-if="showMaintenance" style="display: none">
    <NuxtLayout name="blank">
      <NuxtPage />
    </NuxtLayout>
  </div>

  <!-- Modal de acceso dev -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="showAccessModal"
        class="fixed inset-0 z-[210] flex items-center justify-center px-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="access-modal-title"
        @keydown="handleModalKeydown"
      >
        <div
          class="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          @click="closeAccessModal"
        ></div>

        <div class="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <button
            type="button"
            class="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 transition-colors"
            aria-label="Cerrar diálogo"
            @click="closeAccessModal"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 id="access-modal-title" class="font-title text-xl font-bold text-neutral-900 mb-2">Acceso autorizado</h2>
          <p id="access-modal-desc" class="font-body text-sm text-neutral-600 mb-6">
            Introduce tu clave para acceder al sitio completo.
          </p>

          <form class="space-y-4" @submit.prevent="submitKey">
            <div>
              <label for="access-key-input" class="sr-only">Clave de acceso</label>
              <input
                id="access-key-input"
                v-model="accessKey"
                type="password"
                placeholder="Clave de acceso"
                class="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white font-body text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
                aria-required="true"
                :aria-invalid="!!error"
                :aria-describedby="error ? 'access-error' : 'access-modal-desc'"
                autocomplete="off"
              />
            </div>

            <p v-if="error" id="access-error" class="text-error text-sm font-body" role="alert">
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
