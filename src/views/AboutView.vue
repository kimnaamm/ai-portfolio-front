<template>
  <div class="about">
    <div class="item-card item-main">
      <h1>상품DB</h1>
      <div class="item-card">상품DB 업로드/다운로드</div>
      <div class="item-card">상품명 ai 가공</div>
      <div class="item-card">이미지 상태 확인(DB값 수정)</div>
    </div>
    <div class="item-card item-main">
      <h1>상품이미지</h1>
      <div class="item-card">이미지 다운로드/FTP 업로드 (폴더명기재)</div>
    </div>
    <div class="item-card item-main">
      <h1>상품속성</h1>
      <div class="item-card">상품속성 업로드/다운로드</div>
    </div>
    <div class="item-card item-main">
      <h1>상품대체</h1>
      <div class="item-card">대체상품 조회</div>
    </div>
    <div class="item-card item-main">
      <h1>대시보드</h1>
      <div class="item-card">플랫폼 API 호출 저장</div>
      <div class="item-card">주문상태 조회</div>
      <div class="item-card">주문상태 카톡 알림</div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    padding: 20px;
    gap: 15px;
    display: flex;
    flex-direction: column;
  }
}

.item-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 5px 0px 0px 0px;
  border-radius: 8px;
  width: 100%;
  min-width: 500px;
  background-color: #ffffff;
}

.item-main {
  background-color: #f0f0f0;
}
</style>
<script setup lang="ts">
</script>

