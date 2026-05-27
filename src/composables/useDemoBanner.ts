import { ref } from 'vue'

const STORAGE_KEY = 'pvc-explorer-demo-banner-dismissed'

export const demoBannerVisible = ref(false)

export function initDemoBanner() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    demoBannerVisible.value = true
  }
}

export function showDemoBanner() {
  localStorage.removeItem(STORAGE_KEY)
  demoBannerVisible.value = true
}

export function dismissDemoBanner(permanent: boolean) {
  if (permanent) localStorage.setItem(STORAGE_KEY, '1')
  demoBannerVisible.value = false
}
