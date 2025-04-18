import $axios from '@/shared/api'

export const update = async (payload: Record<string, any>) => {
  const formData = new FormData()

  for (const key in payload) {
    if (key === 'file') {
      formData.append(key, payload[key])
    }
  }

  delete payload.file

  formData.append('data', JSON.stringify(payload))

  const result = await $axios.post('/article/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return result
}
