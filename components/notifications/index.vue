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
<style scoped lang="scss">
@import "assets/scss/variables";
//toast
#toast {
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 999999;
  max-width: calc(100vw - 30px);

  .toast {
    display: flex;
    align-items: center;
    background-color: $color-white;
    min-width: 420px;
    max-width: 450px;
    transition: all linear 0.3s;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    animation: slideInLeft ease 0.3s, fadeOut linear 1s 1000s forwards;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(calc(100% + 32px));
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }

  .toast__icon {
    min-width: 48px;
    min-height: 100%;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toast--success {
    // border-color: $color-green-functional;

    // .toast__icon {
    //   background: $color-green-functional-200;
    // }

    .toast__title {
      color: $color-green-functional !important;
    }
  }

  .toast--info {
    // border-color: #2e73fa;

    // .toast__icon {
    //   background: #dae9ff;
    // }

    .toast__title {
      color: #2e73fa !important;
    }
  }

  .toast--warning {
    // border-color: #ff9300;

    // .toast__icon {
    //   background: #fff3cc;
    // }

    .toast__title {
      color: #ff9300 !important;
    }
  }

  .toast--error {
    // border-color: #ff4a4a;

    // .toast__icon {
    //   background: #ffdce4;
    // }

    .toast__title {
      color: #ff4a4a !important;
    }
  }

  .toast + .toast {
    margin-top: 24px;
  }

  .toast__close {
    padding: 0 16px;
    cursor: pointer;

    img {
      @apply min-w-[24px]
    }
  }

  .toast__body {
    flex-grow: 1;
    padding: 12px;
    padding-left: 0px;
  }

  .toast__title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
  }

  .toast__msg {
    font-size: 14px;
    color: #011627;
    margin-top: 4px;
    line-height: 1.5;
    font-weight: 500;
    word-break: break-word;
    @apply max-w-full
  }
}

@media screen and (max-width: 540px) {
  //toast
  #toast {
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    right: inherit;
    width: 100%;

    .toast {
      min-width: 100%;
      max-width: 100%;
    }

    .toast__close {
      @apply px-2
    }
  }
}
</style>
