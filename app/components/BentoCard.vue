<script setup>
    defineProps({
        bg: {
            type: String,
            required: true,
        },
        textColor: {
            type: String,
            required: true,
            default: "text-primary"
        }
    })
</script>

<template>
    <div class="rounded-3xl bg-primary min-h-[250px] relative isolate overflow-hidden p-10 hover:shadow shadow-neutral-600/15 group">
        <img :src="`/bg/${bg}`" class="object-cover object-center h-full w-full absolute inset-0 transform group-hover:scale-110 scale-105 transition-all duration-300 ease-in-out" alt="">
        <div class="relative max-w-64" :class="textColor">
            <h4 class="font-title font-medium leading-none text-2xl">Lorem ipsum dolor sit amet.</h4>
            <p class="font-body font-normal leaindg-none text-lg">Lorem, ipsum dolor.</p>
        </div>
    </div>
</template>