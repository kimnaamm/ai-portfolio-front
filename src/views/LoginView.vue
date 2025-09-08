<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">🤖 AI Portfolio</h1>
        <p class="login-subtitle">로그인하여 AI 기능을 사용해보세요</p>
      </div>

      <!-- 알림 메시지 -->
      <div v-if="error" class="alert alert-error">
        <span>⚠️ {{ error }}</span>
      </div>

      <div v-if="success" class="alert alert-success">
        <span>✅ {{ success }}</span>
      </div>

      <!-- 로그인 폼 -->
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="idUser" class="form-label">사용자 ID</label>
          <div class="input-wrapper">
            <input
              type="text"
              id="idUser"
              v-model="formData.idUser"
              class="form-input"
              placeholder="사용자 ID를 입력하세요"
              :disabled="isLoading"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">비밀번호</label>
          <div class="input-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="formData.password"
              class="form-input"
              placeholder="비밀번호를 입력하세요"
              :disabled="isLoading"
              required
            />
            <button
              type="button"
              class="password-toggle"
              @click="togglePassword"
              :disabled="isLoading"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="login-button"
          :disabled="isLoading || !canSubmit"
        >
          {{ isLoading ? '로그인 중...' : '🚀 로그인' }}
        </button>
      </form>

      <div class="form-footer">
        <button
          type="button"
          class="link-button"
          @click="handleForgotPassword"
        >
          비밀번호를 잊으셨나요?
        </button>

        <div class="signup-link">
          <span>계정이 없으신가요? </span>
          <button
            type="button"
            class="link-button signup-btn"
            @click="handleSignup"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      formData: {
        idUser: '',
        password: ''
      },
      showPassword: false,
      isLoading: false,
      error: '',
      success: ''
    }
  },
  computed: {
    canSubmit() {
      return this.formData.idUser.trim() && this.formData.password.trim()
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },

    clearMessages() {
      this.error = ''
      this.success = ''
    },

    async handleLogin() {
      this.clearMessages()

      if (!this.formData.idUser.trim()) {
        this.error = '사용자 ID를 입력해주세요.'
        return
      }

      if (!this.formData.password.trim()) {
        this.error = '비밀번호를 입력해주세요.'
        return
      }

      this.isLoading = true

      try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idUser: this.formData.idUser.trim(),
            password: this.formData.password
          })
        })

        const data = await response.json()

        if (response.ok) {
          this.success = '로그인이 완료되었습니다!'

          if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            console.log('로그인 성공:', data)
          }

          this.formData.idUser = ''
          this.formData.password = ''

          setTimeout(() => {
            this.success = ''
            this.$router.push('/')
            console.log('홈으로 이동')
          }, 2000)

        } else {
          this.error = data.message || data.error || '로그인에 실패했습니다.'
        }

      } catch (err) {
        console.error('로그인 요청 오류:', err)
        this.error = '서버와의 연결에 문제가 발생했습니다.'
      } finally {
        this.isLoading = false
      }
    },

    handleForgotPassword() {
      alert('비밀번호 재설정 기능은 준비 중입니다.')
    },

    handleSignup() {
      alert('회원가입 기능은 준비 중입니다.')
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-title {
  color: #333;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
}

.login-subtitle {
  color: #666;
  font-size: 14px;
}

.alert {
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.alert-error {
  background-color: #ffe6e6;
  color: #d32f2f;
  border: 1px solid #ffcdd2;
}

.alert-success {
  background-color: #e8f5e8;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8f9fa;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
}

.login-button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-footer {
  text-align: center;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #e1e5e9;
}

.link-button {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 2px 4px;
}

.link-button:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.signup-link {
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

.signup-btn {
  font-weight: 600;
}
</style>
