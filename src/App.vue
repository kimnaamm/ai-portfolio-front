<script setup lang="ts">
import { ref } from "vue"
import { getHealth } from "./api/health"

const msg = ref("ready")
const ping = async () => {
  try {
    const { data } = await getHealth()
    msg.value = JSON.stringify(data)
  } catch (e: any) {
    msg.value = e?.message || "error"
  }
}
</script>

<template>
  <div id="app">
    <nav class="main-nav">
      <div class="nav-container">
        <div class="nav-menu">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
          <router-link to="/product" class="nav-link">상품DB</router-link>
          <router-link to="/image" class="nav-link">상품이미지</router-link>
          <router-link to="/attr" class="nav-link">상품속성</router-link>
          <router-link to="/replace" class="nav-link">상품대체</router-link>
          <router-link to="/dash" class="nav-link">대시보드</router-link>

          <router-link to="/login" class="nav-link">LOGIN</router-link>
          <router-link to="/signup" class="nav-link">SIGNUP</router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view/>
    </main>
  </div>
</template>

<style>
/* 글로벌 스타일 리셋 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

/* Nav 가로 스타일 */
.main-nav {
  width: 200px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #e0e0e0;
}

.nav-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 550px;
  width: 150px;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: #3498db;
  background-color: #f8f9fa;
}

.nav-link.router-link-active {
  color: #3498db;
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 16px;
  right: 16px;
  height: 2px;
  background-color: #3498db;
  border-radius: 1px;
}

/* 메인 컨텐츠 스타일 */
.main-content {
  flex: 1;
  padding: 32px 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
    height: 56px;
  }

  .nav-menu {
    gap: 20px;
    justify-content: center;
  }

  .nav-link {
    font-size: 14px;
    padding: 6px 12px;
  }

  .main-content {
    padding: 24px 16px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 12px;
    height: 48px;
  }

  .nav-menu {
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-link {
    font-size: 13px;
    padding: 4px 8px;
  }

  .main-content {
    padding: 16px 12px;
  }
}
</style>
