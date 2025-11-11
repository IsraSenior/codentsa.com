<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  slidesPerView: {
    type: Number,
    default: 4,
  },
  spaceBetween: {
    type: Number,
    default: 16,
  },
  autoplay: {
    type: [Boolean, Object],
    default: false,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  navigation: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <BaseCarousel
    :items="items"
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    :autoplay="autoplay"
    :loop="loop"
    :navigation="navigation"
    :pagination="pagination"
  >
    <template #default="{ item }">
      <TestimonialsCard
        :product-name="item.productName"
        :review="item.review"
        :rating="item.rating"
        :author-name="item.authorName"
        :author-avatar="item.authorAvatar"
        :time-ago="item.timeAgo"
      />
    </template>
  </BaseCarousel>
</template>
