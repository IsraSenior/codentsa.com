<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Selecciona una fecha',
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const inputRef = ref(null)
const calendarRef = ref(null)

// Current view state
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

// Months in Spanish
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

// Days of week in Spanish
const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

// Format date for display
const formattedDate = computed(() => {
  if (!props.modelValue) return ''
  const date = new Date(props.modelValue + 'T00:00:00')
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
})

// Get days in month
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate()
}

// Get first day of month (0 = Sunday)
const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay()
}

// Generate calendar days
const calendarDays = computed(() => {
  const days = []
  const daysInMonth = getDaysInMonth(currentMonth.value, currentYear.value)
  const firstDay = getFirstDayOfMonth(currentMonth.value, currentYear.value)

  // Add empty slots for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Add days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return days
})

// Check if date is selected
const isSelected = (day) => {
  if (!day || !props.modelValue) return false
  const selected = new Date(props.modelValue + 'T00:00:00')
  return selected.getDate() === day &&
         selected.getMonth() === currentMonth.value &&
         selected.getFullYear() === currentYear.value
}

// Check if date is today
const isToday = (day) => {
  if (!day) return false
  const today = new Date()
  return today.getDate() === day &&
         today.getMonth() === currentMonth.value &&
         today.getFullYear() === currentYear.value
}

// Select date
const selectDate = (day) => {
  if (!day) return

  const year = currentYear.value
  const month = String(currentMonth.value + 1).padStart(2, '0')
  const dayStr = String(day).padStart(2, '0')

  emit('update:modelValue', `${year}-${month}-${dayStr}`)
  isOpen.value = false
}

// Navigate months
const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

// Close on click outside
const handleClickOutside = (event) => {
  if (calendarRef.value && !calendarRef.value.contains(event.target) &&
      inputRef.value && !inputRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative">
    <!-- Input -->
    <input
      ref="inputRef"
      :value="formattedDate"
      type="text"
      readonly
      :placeholder="placeholder"
      class="w-full px-4 py-3 border border-neutral-300 rounded-lg font-body text-base focus:outline-none focus:border-primary transition-colors cursor-pointer"
      @click="isOpen = !isOpen"
    >

    <!-- Calendar Dropdown -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-2"
    >
      <div
        v-if="isOpen"
        ref="calendarRef"
        class="absolute z-50 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 p-4"
      >
        <!-- Month/Year Header -->
        <div class="flex items-center justify-between mb-4">
          <button
            type="button"
            class="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            @click="previousMonth"
          >
            <ChevronLeftIcon class="w-5 h-5 text-black" />
          </button>

          <div class="font-title text-lg text-black">
            {{ months[currentMonth] }} {{ currentYear }}
          </div>

          <button
            type="button"
            class="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            @click="nextMonth"
          >
            <ChevronRightIcon class="w-5 h-5 text-black" />
          </button>
        </div>

        <!-- Days of week -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div
            v-for="day in daysOfWeek"
            :key="day"
            class="text-center text-xs font-body text-neutral-600 py-2"
          >
            {{ day }}
          </div>
        </div>

        <!-- Calendar days -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="(day, index) in calendarDays"
            :key="index"
            type="button"
            :disabled="!day"
            class="aspect-square flex items-center justify-center rounded-lg font-body text-sm transition-all"
            :class="{
              'text-transparent cursor-default': !day,
              'hover:bg-neutral-100': day && !isSelected(day),
              'bg-black text-white': isSelected(day),
              'font-semibold ring-2 ring-primary ring-offset-2': isToday(day) && !isSelected(day),
              'text-black': day && !isSelected(day),
            }"
            @click="selectDate(day)"
          >
            {{ day || '' }}
          </button>
        </div>

        <!-- Today button -->
        <div class="mt-4 pt-4 border-t border-neutral-200">
          <button
            type="button"
            class="w-full py-2 px-4 text-sm font-body text-primary hover:bg-neutral-50 rounded-lg transition-colors"
            @click="selectDate(new Date().getDate()); currentMonth = new Date().getMonth(); currentYear = new Date().getFullYear()"
          >
            Hoy
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
