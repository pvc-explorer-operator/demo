import { ref } from 'vue'

const STORAGE_KEY = 'pvc-explorer-demo-banner-dismissed'

export const demoBannerVisible = ref(false)

let _pendingTourStart: (() => void) | null = null
export function registerPendingTourStart(fn: () => void) {
  _pendingTourStart = fn
}

export function initDemoBanner() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    demoBannerVisible.value = true
  }
}

export function showDemoBanner() {
  localStorage.removeItem(STORAGE_KEY)
  demoBannerVisible.value = true
}

export function dismissDemoBanner(permanent: boolean, isFirstVisit: boolean) {
  if (permanent) localStorage.setItem(STORAGE_KEY, '1')
  demoBannerVisible.value = false
  if (isFirstVisit && _pendingTourStart) {
    const fn = _pendingTourStart
    _pendingTourStart = null
    setTimeout(fn, 300)
  }
}
