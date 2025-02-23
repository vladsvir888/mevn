import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import type { UserDetails } from '../config'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserDetails | null>(null)
  const token = ref<string | null>(null)
  const isAuth = computed(() => !!user.value)

  const setUser = (value: UserDetails | null) => {
    user.value = value
  }

  const setToken = (value: string | null) => {
    token.value = value
  }

  const loadFromLS = () => {
    const tokenInfo = localStorage.getItem('token')
    const userInfo = localStorage.getItem('user')

    if (tokenInfo && userInfo) {
      setUser(JSON.parse(userInfo))
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
    user,
    isAuth,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
