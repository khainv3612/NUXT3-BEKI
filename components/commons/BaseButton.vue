<template>
  <el-button
    :class="['btn-common', classExtra, classCustom, isFullWidth ? 'w-full' : '']"
    :loading="loading"
    :disabled="disabled"
    :readonly="readonly"
    @click.stop="$emit('submit')"
  >
    <slot />
  </el-button>
</template>
<script setup>
import { COMMON_PROPS_BUTTON } from '~/utils/contants/button'

defineProps({ ...COMMON_PROPS_BUTTON })
defineEmits(['submit'])
</script>
