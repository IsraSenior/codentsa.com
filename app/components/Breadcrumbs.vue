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
  <nav class="bg-neutral-50 py-4 border-b border-neutral-200">
    <div class="container mx-auto px-4">
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
            class="text-neutral-700 hover:text-primary transition-colors underline"
          >
            {{ item.name }}
          </NuxtLink>
          <span
            v-else
            class="text-black font-medium"
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
