import { ref } from 'vue'
import { useExplorerStore } from '@/stores/explorerStore'
import { mockExplorers, mockScopes } from '../dev-mock/data'
import type { WebSocketCallbacks } from '@/composables/useWebSocket'

export type { WebSocketCallbacks }

export function useWebSocket(callbacks?: WebSocketCallbacks) {
  const connected = ref(false)
  const lastEventId = ref('mock-1')
  let pingInterval: ReturnType<typeof setInterval> | null = null
  let idleInterval: ReturnType<typeof setInterval> | null = null

  // Push mock data eagerly so it populates even if connect() is never called
  const explorerStore = useExplorerStore()
  setTimeout(() => {
    explorerStore.setSnapshot(mockExplorers as any, mockScopes as any)
  }, 0)

  function connect(): void {
    connected.value = true

    pingInterval = setInterval(() => {
      callbacks?.onIdleTick?.({
        namespace: 'team-alpha',
        name: 'alpha-data-explorer',
        remainingSeconds: 600,
        idleTimeout: '30m',
      })
    }, 30_000)

    idleInterval = setInterval(() => {
      callbacks?.onIdleWarning?.({
        namespace: 'team-alpha',
        name: 'alpha-data-explorer',
        remainingSeconds: 60,
        warningThreshold: 300,
      })
    }, 120_000)
  }

  function disconnect(): void {
    connected.value = false
    if (pingInterval) { clearInterval(pingInterval); pingInterval = null }
    if (idleInterval) { clearInterval(idleInterval); idleInterval = null }
  }

  return { connect, disconnect, connected, lastEventId }
}
