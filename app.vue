<template>
  <div>
    <Head>
      <Title>{{ $t('title') }}</Title>
      <Meta name="description" :content="$t('description')" />
    </Head>
    <suspense>
      <template #default>
        <NuxtLayout>
          <NuxtLoadingIndicator />
          <NuxtPage />
        </NuxtLayout>
      </template>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import LanguageService from '~/services/language-service'
import LoadingService from '~/services/loading-service'
import { trans } from '~/utils/utils'

LoadingService.startLoading()
const i18n = useI18n()
useHead({
  htmlAttrs: { lang: i18n.locale.value },
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, height=device-height, minimum-scale=1.0'
    }
  ]
})
useSeoMeta({
  ogImage: '/assets/image.png',
  ogDescription: trans('description')
})
LanguageService.initLanguage()
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    LoadingService.stopLoading()
  }, 500)
})
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
