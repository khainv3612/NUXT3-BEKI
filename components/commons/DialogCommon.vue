<template>
  <client-only>
    <el-dialog
        v-model="isVisible"
        :modal-class="`common-dialog ${customClass}`"
        align-center
        :show-close="false"
        :destroy-on-close="true"
        :lock-scroll="true"
        :width="width"
        :before-close="closeModal"
        :open-delay="openDelay"
    >
      <div class="common-dialog__body flex flex-col gap-6">
        <div :class="['flex w-full items-center common-dialog__header', title ? 'justify-between' : 'justify-end']">
          <p v-if="title" class="common-dialog__title">{{ $t(title) }}</p>
          <button v-if="isShowClose" class="w-5 h-5" @click="closeModal">
            <img src="@/assets/icons/close-modal.svg" alt="">
          </button>
        </div>
        <div class="common-dialog__content">
          <slot name="body" />
        </div>
        <div v-if="isHasFooter" class="common-dialog__footer">
          <slot v-if="isCustomFooter" name="footer" />
          <template v-else>
            <el-button type="default" @click="closeModal">
              {{ $t('common.close') }}
            </el-button>
          </template>
        </div>
      </div>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
const emits = defineEmits(['close'])
const props = defineProps({
  title: {
    type: String,
    default: 'title'
  },
  isVisible: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  isHasFooter: {
    type: Boolean,
    default: true
  },
  isCustomFooter: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 400
  },
  openDelay: {
    type: Number,
    default: 0
  },
  isShowClose: {
    type: Boolean,
    default: true
  }
})
const { isVisible } = toRefs(props)
const closeModal = () => {
  emits('close')
}
</script>
