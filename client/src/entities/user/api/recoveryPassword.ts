import $axios from '@/shared/api'

export const recoveryPassword = async (payload: { password: string; link: string }) => {
  const result = await $axios.post(`/auth/reset-password/${payload.link}`, {
    newPassword: payload.password,
  })
  return result
}
