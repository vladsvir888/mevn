import type { ComputedRef } from 'vue'

export const useMeta = (meta: ComputedRef<{ title: string; description: string }>) => {
  const titleElement = document.head.querySelector('title') as HTMLTitleElement
  titleElement.textContent = meta.value.title

  const metaDescriptionElement = document.head.querySelector('meta[name="description"]') as Element
  metaDescriptionElement.textContent = meta.value.description
}
