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
      <ProductCard
        v-if="item.type === 'product'"
        :title="item.title"
        :brand="item.brand"
        :image="item.image"
        :description="item.description"
        :original-price="item.originalPrice"
        :price="item.price"
        :is-favorite="item.isFavorite"
      />
      <ProductBanner
        v-else-if="item.type === 'banner'"
        :title="item.title"
        :description="item.description"
        :cta-text="item.ctaText"
        :cta-link="item.ctaLink"
        :bg-color="item.bgColor"
        :image="item.image"
      />
    </template>
  </BaseCarousel>
</template>
