<template>
  <div>
    <NuxtLink to="/home">{{ $t('hello') }}</NuxtLink>
    <p>{{ _isNil(1)}}</p>
  </div>
</template>

<script lang="ts" setup>
</script>
