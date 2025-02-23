import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<string | null>(null)
  const token = ref<string | null>(null)
  const isAuth = computed(() => !!user.value)

  const setUser = (value: string | null) => {
    user.value = value
  }

  const setToken = (value: string | null) => {
    token.value = value
  }

  const loadFromLS = () => {
    const tokenInfo = localStorage.getItem('token')
    const userInfo = localStorage.getItem('user')

    if (tokenInfo && userInfo) {
      setUser(userInfo)
      setToken(tokenInfo)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setUser(null)
    setToken(null)
  }

  return {
    setUser,
    setToken,
    loadFromLS,
    logout,
    isAuth,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
