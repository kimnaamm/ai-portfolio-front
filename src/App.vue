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
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/">상품디비</router-link> |
      <router-link to="/">상품속성</router-link> |
      <router-link to="/">상품대체</router-link> |
      <router-link to="/">대쉬보드</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <br/>
    <router-view/>
  </div>
</template>
