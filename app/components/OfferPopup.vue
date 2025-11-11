<script setup>
import { XMarkIcon, ClockIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  // Countdown duration in seconds (default 2 hours = 7200 seconds)
  durationSeconds: {
    type: Number,
    default: 7200, // 2 hours
  },
  // Delay before showing popup (in ms)
  delayMs: {
    type: Number,
    default: 5000, // 5 seconds
  },
  // Snooze duration in minutes (default 30 minutes)
  snoozeDurationMinutes: {
    type: Number,
    default: 30,
  },
})

const isVisible = ref(false)
const showSnoozeButton = ref(false)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let countdownInterval = null

// Format number to always have 2 digits
const formatTime = (num) => String(num).padStart(2, '0')

// Calculate and update countdown display
const updateDisplay = (remainingSeconds) => {
  hours.value = Math.floor(remainingSeconds / 3600)
  minutes.value = Math.floor((remainingSeconds % 3600) / 60)
  seconds.value = remainingSeconds % 60
}

// Start or resume countdown
const startCountdown = () => {
  if (typeof window === 'undefined') return

  // Check if countdown already exists in sessionStorage
  const storedEndTime = sessionStorage.getItem('codentsa_offer_end_time')
  let endTime

  if (storedEndTime) {
    endTime = parseInt(storedEndTime, 10)
  } else {
    // Create new countdown
    endTime = Date.now() + props.durationSeconds * 1000
    sessionStorage.setItem('codentsa_offer_end_time', endTime.toString())
  }

  // Update countdown every second
  countdownInterval = setInterval(() => {
    const now = Date.now()
    const remainingMs = endTime - now

    if (remainingMs <= 0) {
      // Countdown finished
      clearInterval(countdownInterval)
      updateDisplay(0)
      closePopup()
      return
    }

    const remainingSeconds = Math.floor(remainingMs / 1000)
    updateDisplay(remainingSeconds)
  }, 1000)

  // Initial update
  const remainingMs = endTime - Date.now()
  const remainingSeconds = Math.floor(remainingMs / 1000)
  updateDisplay(remainingSeconds)
}

// Close popup
const closePopup = () => {
  isVisible.value = false
  showSnoozeButton.value = false
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  // Mark as closed in session to not show again
  sessionStorage.setItem('codentsa_offer_closed', 'true')
}

// Snooze popup
const snoozePopup = () => {
  isVisible.value = false
  showSnoozeButton.value = false
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  // Set snooze time
  const snoozeUntil = Date.now() + props.snoozeDurationMinutes * 60 * 1000
  sessionStorage.setItem('codentsa_offer_snooze_until', snoozeUntil.toString())
}

// Check if popup should be shown
const shouldShowPopup = () => {
  if (typeof window === 'undefined') return false

  // Don't show if already closed in this session
  const wasClosed = sessionStorage.getItem('codentsa_offer_closed')
  if (wasClosed === 'true') return false

  // Don't show if snoozed
  const snoozeUntil = sessionStorage.getItem('codentsa_offer_snooze_until')
  if (snoozeUntil) {
    const snoozeTime = parseInt(snoozeUntil, 10)
    if (Date.now() < snoozeTime) return false
    // Clear snooze if expired
    sessionStorage.removeItem('codentsa_offer_snooze_until')
  }

  // Don't show if countdown has expired
  const storedEndTime = sessionStorage.getItem('codentsa_offer_end_time')
  if (storedEndTime) {
    const endTime = parseInt(storedEndTime, 10)
    if (Date.now() >= endTime) return false
  }

  return true
}

onMounted(() => {
  if (!shouldShowPopup()) return

  // Show popup after delay
  setTimeout(() => {
    isVisible.value = true
    startCountdown()
    // Show snooze button 2 seconds after popup appears
    setTimeout(() => {
      showSnoozeButton.value = true
    }, 2000)
  }, props.delayMs)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<template>
  <!-- Overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black/40 z-100"
      @click="closePopup"
    />
  </Transition>

  <!-- Popup Modal -->
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-5 right-5 w-[340px] md:w-[380px] h-[420px] bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden"
      style="background-image: url('/promo-bg-popup.webp'); background-size: 60%; background-position: right bottom; background-repeat: no-repeat;"
    >
      <!-- Close Button -->
      <button
        class="absolute top-4 right-4 p-1 text-primary hover:text-primary-700 transition-colors z-10"
        @click="closePopup"
      >
        <XMarkIcon class="w-6 h-6" :stroke-width="2.5" />
      </button>

      <!-- Content -->
      <div class="p-6 relative z-10 h-full flex flex-col justify-between">
        <div>
          <!-- Header -->
          <p class="font-body text-sm text-primary font-medium mb-2">
            Descuentos por tiempo limitado
          </p>

          <!-- Title -->
          <h2 class="font-title text-3xl md:text-5xl text-primary font-bold mb-6 leading-tight">
            Consumibles
          </h2>

          <!-- CTA Button -->
          <NuxtLink
            to="/productos"
            class="inline-block px-6 py-3 bg-black text-white rounded-lg font-body text-sm font-medium hover:bg-neutral-800 transition-colors"
            @click="closePopup"
          >
            Ver oferta
          </NuxtLink>
        </div>

        <!-- Countdown Timer -->
        <div class="flex items-center gap-2">
          <div class="flex flex-col items-center">
            <span class="font-title text-4xl text-primary font-bold leading-none">{{ formatTime(hours) }}</span>
            <span class="font-body text-xs text-primary mt-1">horas</span>
          </div>
          <span class="font-title text-3xl text-primary font-bold mb-4">:</span>
          <div class="flex flex-col items-center">
            <span class="font-title text-4xl text-primary font-bold leading-none">{{ formatTime(minutes) }}</span>
            <span class="font-body text-xs text-primary mt-1">minutos</span>
          </div>
          <span class="font-title text-3xl text-primary font-bold mb-4">:</span>
          <div class="flex flex-col items-center">
            <span class="font-title text-4xl text-primary font-bold leading-none">{{ formatTime(seconds) }}</span>
            <span class="font-body text-xs text-primary mt-1">segundos</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Snooze Button (shadcn/ui toast style) -->
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-x-[-100%]"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-[-100%]"
  >
    <button
      v-if="showSnoozeButton"
      class="fixed bottom-5 left-5 px-4 py-3 bg-white border border-neutral-200 rounded-lg shadow-lg z-[102] flex items-center gap-2 hover:bg-neutral-50 transition-colors group"
      @click="snoozePopup"
    >
      <ClockIcon class="w-5 h-5 text-neutral-600 group-hover:text-black transition-colors" :stroke-width="2" />
      <span class="font-body text-sm text-neutral-700 group-hover:text-black transition-colors">
        Recordar más tarde
      </span>
    </button>
  </Transition>
</template>
