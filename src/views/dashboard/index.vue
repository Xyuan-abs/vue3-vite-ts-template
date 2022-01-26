<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const store = useUserStore()
const { userName, isAdmin } = storeToRefs(store)
store.login('1515123445', '*******')
</script>

<template>
  <div class="dashboard">
    <p>userName：{{ userName }}</p>
    <p>isAdmin：{{ isAdmin }}</p>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
