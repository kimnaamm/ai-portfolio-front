<template>
  <div class="product-view">
    <h1>상품 목록 (TB_ITEMS_ORIGIN)</h1>

    <div v-if="loading">로딩 중...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="item in items" :key="`${item.id.cdVendor}:${item.id.noItem}`"
           class="item-card">
        <h3><strong>{{ item.nmItemOrigin }}</strong></h3>
        <p>{{ item.dsKeywords }}</p>
        <p>{{ item.cdMycate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { productApi, type ItemOrigin } from "../api/productApi"

const items = ref<ItemOrigin[]>([])
const loading = ref(false)
const error = ref("")

const fetchItems = async () => {
  loading.value = true
  error.value = ""
  try {
    const response = await productApi.getAllProducts()
    items.value = response.data.content
  } catch (err: any) {
    error.value = "데이터를 불러오는데 실패했습니다: " + err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchItems()
})
</script>

<style scoped>
.product-view {
  padding: 20px;
}

.item-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px 0;
  border-radius: 8px;
  width: 800px;
}
</style>
