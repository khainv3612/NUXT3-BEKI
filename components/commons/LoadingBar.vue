<template>
  <div>
    <client-only>
      <div v-if="loading" id="preloader">
        <div id="status">
          <div class="spinner-chase">
            <div class="chase-dot"></div>
            <div class="chase-dot"></div>
            <div class="chase-dot"></div>
            <div class="chase-dot"></div>
            <div class="chase-dot"></div>
            <div class="chase-dot"></div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import appStore from '~/store/app'

const store = appStore()
const { loading } = storeToRefs(store)
</script>
