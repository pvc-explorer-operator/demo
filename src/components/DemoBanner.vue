<template>
  <Dialog
    v-model:visible="demoBannerVisible"
    modal
    :closable="true"
    :style="{ width: '540px', maxWidth: '95vw' }"
    header="👋 Welcome to the PVC Explorer Demo"
  >
    <div class="demo-banner-body">
      <p>
        This is a <strong>read-only mockup demo</strong> with static data.
        No Kubernetes cluster is connected — everything you see is generated mock data.
      </p>
      <ul>
        <li>Actions like <strong>Connect</strong>, <strong>Disconnect</strong>, and <strong>Wake</strong> are not available — they will show an info message instead.</li>
        <li>The <strong>file browser</strong> is fully navigable with mock files.</li>
        <li>All data resets on page reload.</li>
      </ul>
      <p class="demo-banner-hint">To explore the full live experience:</p>
      <ul>
        <li>Run the mock UI locally: <code>cd ui &amp;&amp; npm run dev</code></li>
        <li>Or deploy a real cluster setup with Kind — see the
          <a href="https://github.com/pvc-explorer-operator/pvc-explorer" target="_blank" rel="noopener">GitHub repo</a>.
        </li>
      </ul>
    </div>
    <template #footer>
      <div class="demo-banner-footer">
        <label class="demo-banner-skip">
          <input type="checkbox" v-model="dontShow" />
          Don't show again
        </label>
        <Button label="Got it, let's explore!" icon="pi pi-arrow-right" @click="close" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { demoBannerVisible, initDemoBanner, dismissDemoBanner } from '@/composables/useDemoBanner'

const dontShow = ref(false)

onMounted(() => {
  const tourSeen = localStorage.getItem('pvc-explorer-tour-seen')
  const bannerDismissed = localStorage.getItem('pvc-explorer-demo-banner-dismissed')
  if (tourSeen && !bannerDismissed) {
    initDemoBanner()
  }
})

function close() {
  dismissDemoBanner(dontShow.value)
}
</script>

<style scoped>
.demo-banner-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.6;
}
.demo-banner-body ul {
  margin: 0;
  padding-left: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.demo-banner-hint {
  color: var(--p-text-muted-color, var(--text-color-secondary));
  font-weight: 500;
}
.demo-banner-body code {
  background: var(--p-surface-ground, var(--surface-ground));
  padding: 0.1em 0.4em;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: monospace;
}
.demo-banner-body a {
  color: var(--p-primary-color, var(--primary-color));
}
.demo-banner-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
}
.demo-banner-skip {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  color: var(--p-text-muted-color, var(--text-color-secondary));
  cursor: pointer;
  user-select: none;
}
</style>
