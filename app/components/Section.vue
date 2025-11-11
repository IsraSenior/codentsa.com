<script setup>
    defineProps({
        title: {
            type: String,
            required: true,
        },
    })
</script>

<template>
    <section class="py-16 md:py-24">
        <div class="container px-5 lg:px-0 mx-auto">
            <h2 v-if="title" class="text-black text-4xl leading-10 mb-10 font-title text-center lg:text-left">{{ title }}</h2>

            <slot />
        </div>
    </section>
</template>