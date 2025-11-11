<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
})
</script>

<template>
    <div class="p-10 rounded-full aspect-square bg-neutral-100 flex items-center justify-center shadow-sm hover:shadow shadow-neutral-600/15 transition-all duration-200">
        <img
            :src="logo"
            :alt="name"
            class="w-full h-full object-contain object-center"
        >
    </div>
</template>
