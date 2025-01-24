<template>
  <section class="w-full max-w-content mx-auto">
    <client-only>
      <LayoutHeader />
      <div class="layout-content">
        <slot />
      </div>
      <LayoutFooter />
      <Notifications />
      <LayoutDialog />
    </client-only>
    <LoadingBar />
  </section>
</template>

<script setup lang="ts">
import LoadingBar from '~/components/commons/LoadingBar.vue'
</script>
