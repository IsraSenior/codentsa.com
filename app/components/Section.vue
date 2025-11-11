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
        <div class="container mx-auto">
            <h2 class="text-black text-4xl leading-10 mb-10 font-title">{{ title }}</h2>

            <slot />
        </div>
    </section>
</template>