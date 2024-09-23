<template>
  <transition name="fade">
    <div v-if="notification && notification.show" id="toast">
      <div :class="'toast toast--' + notification.type">
        <div class="toast__icon">
          <img :src="getIcon(`${notification.type}.svg`)" :alt="notification.type" />
        </div>
        <div class="toast__body">
          <h3 class="toast__title">{{ notification.title }}</h3>
          <p class="toast__msg">{{ notification.message }}</p>
        </div>
        <div class="toast__close" @click="close">
          <img src="@/assets/icons/close.svg" alt="" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { TIME_SHOW_NOTIFICATION } from '~/utils/constants'
import notificationService from '~/services/noti-service'
import appStore from '~/store/app'
import { getIcon } from '~/utils/utils'

const timeHide = ref(TIME_SHOW_NOTIFICATION)
const timeOut = ref()
const { notification } = storeToRefs(appStore())

watch([notification], () => {
  clearTimeout(timeOut.value)
  configTimeOut()
})
onBeforeUnmount(() => {
  clearTimeout(timeOut.value)
})

const configTimeOut = () => {
  timeOut.value = setTimeout(() => {
    notificationService.hideNoti()
    clearTimeout(timeOut.value)
  }, timeHide.value)
}

const close = () => {
  clearTimeout(timeOut.value)
  notificationService.setNotification({ show: false })
}
</script>
