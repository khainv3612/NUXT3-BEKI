<template>
  <section>
    <client-only>
      <LayoutHeader />
      <LayoutContent>
        <slot />
      </LayoutContent>
      <Notifications />
      <LayoutDialog />
      <LayoutFooter />
    </client-only>
    <LoadingBar />
  </section>
</template>
<script setup lang="ts">
import LoadingBar from '~/components/commons/LoadingBar.vue'

</script>
