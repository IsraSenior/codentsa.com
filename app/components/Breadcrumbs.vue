<script setup>
const route = useRoute()

// Generate breadcrumb items from current route
const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(Boolean)

  // Always start with Home
  const items = [
    {
      name: 'Home',
      path: '/',
      isActive: false
    }
  ]

  // Build breadcrumbs from path segments
  let currentPath = ''
  pathArray.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Format segment name (capitalize, replace hyphens with spaces)
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Last item is active (current page)
    const isActive = index === pathArray.length - 1

    items.push({
      name,
      path: currentPath,
      isActive
    })
  })

  return items
})
</script>

<template>
  <nav class="bg-neutral-white py-5">
    <div class="container mx-auto px-5 lg:px-0">
      <ol class="flex items-center gap-2 text-sm font-body">
        <li
          v-for="(item, index) in breadcrumbs"
          :key="item.path"
          class="flex items-center gap-2"
        >
          <!-- Breadcrumb Item -->
          <NuxtLink
            v-if="!item.isActive"
            :to="item.path"
            class="text-black font-medium hover:text-primary transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
          <span
            v-else
            class="text-neutral-700 underline"
          >
            {{ item.name }}
          </span>

          <!-- Separator -->
          <span
            v-if="index < breadcrumbs.length - 1"
            class="text-neutral-500"
          >
            >
          </span>
        </li>
      </ol>
    </div>
  </nav>
</template>
