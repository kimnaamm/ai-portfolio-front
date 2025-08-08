<script setup lang="ts">
import { ref } from 'vue'
import { getHealth } from './api/health'

const msg = ref('ready')
const ping = async () => {
  try {
    const { data } = await getHealth()
    msg.value = JSON.stringify(data)
  } catch (e: any) {
    msg.value = e?.message || 'error'
  }
}
</script>

<template>
  <div style="padding:24px">
    <h1>GitHub Actions → Firebase 자동배포 테스트</h1>
    <button @click="ping">Ping Backend</button>
    <pre>{{ msg }}</pre>
  </div>
</template>
