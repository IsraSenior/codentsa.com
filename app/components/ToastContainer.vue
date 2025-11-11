<script setup>
const toastStore = useToastStore()

const handleClose = (id) => {
  toastStore.removeToast(id)
}
</script>

<template>
  <div class="fixed bottom-5 left-5 z-[200] flex flex-col-reverse gap-3 pointer-events-none">
    <TransitionGroup
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-full"
    >
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="pointer-events-auto"
      >
        <Toast
          :id="toast.id"
          :message="toast.message"
          :type="toast.type"
          @close="handleClose"
        />
      </div>
    </TransitionGroup>
  </div>
</template>
