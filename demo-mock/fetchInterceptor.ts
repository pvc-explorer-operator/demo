import { mockExplorers, mockScopes } from '../dev-mock/data'

interface MockFile { content: string; size: number; modTime: string; isDir: boolean }
const mockFs = new Map<string, MockFile>()

function seed(path: string, content: string) {
  mockFs.set(path, { content, size: content.length, modTime: new Date().toISOString(), isDir: false })
}
function seedDir(path: string) {
  mockFs.set(path, { content: '', size: 0, modTime: new Date().toISOString(), isDir: true })
}

seedDir('config')
seedDir('data')
seedDir('logs')
seed('README.md', '# Mock PVC\n\nThis is a **demo** filesystem.\n\nEdit me and press Ctrl+S to save.\n')
seed('config/app.yaml', 'server:\n  port: 8080\n  debug: true\n\ndatabase:\n  host: postgres\n  port: 5432\n  name: myapp\n')
seed('config/secret.env', 'DATABASE_URL=postgres://user:pass@localhost/myapp\nSECRET_KEY=demo-only-secret\n')
seed('data/sample.json', JSON.stringify({ version: 1, items: [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }] }, null, 2) + '\n')
seed('data/query.sql', 'SELECT id, name, created_at\nFROM items\nWHERE active = true\nORDER BY created_at DESC\nLIMIT 100;\n')
seed('logs/app.log', '2026-05-23T10:00:00Z INFO  Server started port=8080\n2026-05-23T10:01:00Z INFO  Request GET /health\n2026-05-23T10:02:00Z WARN  Slow query duration=320ms\n')

function listDir(dir: string) {
  const prefix = dir ? dir + '/' : ''
  const seen = new Set<string>()
  const result: { name: string; isDir: boolean; size: number; modTime: string }[] = []
  for (const [p] of mockFs.entries()) {
    if (!p.startsWith(prefix)) continue
    const rest = p.slice(prefix.length)
    if (!rest) continue
    const seg = rest.split('/')[0]
    if (seen.has(seg)) continue
    seen.add(seg)
    const directKey = prefix + seg
    const entry = mockFs.get(directKey)
    result.push({ name: seg, isDir: entry ? entry.isDir : rest.includes('/'), size: entry ? entry.size : 0, modTime: entry ? entry.modTime : new Date().toISOString() })
  }
  return result
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
}

function noContent(): Response {
  return new Response(null, { status: 204 })
}

function handleRequest(method: string, path: string, url: URL, body?: string): Response | null {
  if (path === '/api/v1/auth/me' && method === 'GET') return json({ username: 'demo', role: 'admin' })
  if (path === '/api/v1/auth/login' && method === 'POST') return json({ username: 'demo', role: 'admin' })
  if (path === '/api/v1/auth/logout' && method === 'POST') return noContent()
  if (path === '/api/version' && method === 'GET') return new Response('demo', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

  if (path === '/api/v1/namespaces' && method === 'GET') {
    return json([...new Set(mockExplorers.map(e => (e.metadata as any).namespace))])
  }
  const nsMatch = path.match(/^\/api\/v1\/namespaces\/([^/]+)\/pvcs$/)
  if (nsMatch && method === 'GET') {
    const ns = decodeURIComponent(nsMatch[1])
    return json(mockExplorers.filter(e => (e.metadata as any).namespace === ns).map(e => e.spec.pvcName))
  }

  if (path === '/api/v1/scopes' && method === 'GET') return json(mockScopes)
  if (path === '/api/v1/scopes' && method === 'POST') return json({}, 201)
  const scopeMatch = path.match(/^\/api\/v1\/scopes\/([^/]+)$/)
  if (scopeMatch && method === 'GET') {
    const scope = mockScopes.find(s => (s.metadata as any).name === decodeURIComponent(scopeMatch[1]))
    return scope ? json(scope) : json({ error: 'not found' }, 404)
  }

  const proxyMatch = path.match(/^\/api\/v1\/explorers\/([^/]+)\/([^/]+)\/proxy\/api\/([^?]*)/)
  if (proxyMatch) {
    const endpoint = proxyMatch[3]
    const filePath = url.searchParams.get('path') ?? ''
    if (endpoint === 'config') return json({ readonly: false, forceRW: false, pvc: 'mock-pvc', namespace: 'demo', pod: 'mock-pod', cluster: 'demo', version: 'demo' })
    if (endpoint === 'files') {
      if (method === 'GET') return json({ entries: listDir(filePath) })
      if (method === 'DELETE') {
        for (const k of [...mockFs.keys()]) { if (k === filePath || k.startsWith(filePath + '/')) mockFs.delete(k) }
        return noContent()
      }
    }
    if (endpoint === 'download' && method === 'GET') {
      const entry = mockFs.get(filePath)
      if (!entry || entry.isDir) return new Response('not found', { status: 404 })
      return new Response(entry.content, { headers: { 'Content-Type': 'application/octet-stream', 'Content-Disposition': 'attachment; filename="' + (filePath.split('/').pop() ?? 'file') + '"' } })
    }
    if (endpoint === 'edit' && (method === 'PUT' || method === 'POST')) {
      mockFs.set(filePath, { content: body ?? '', size: (body ?? '').length, modTime: new Date().toISOString(), isDir: false })
      return noContent()
    }
    if (endpoint === 'rename' && method === 'POST') {
      const { from, to } = JSON.parse(body ?? '{}')
      const entry = mockFs.get(from)
      if (entry) { mockFs.set(to, entry); mockFs.delete(from) }
      return noContent()
    }
    if (endpoint === 'upload' && method === 'POST') return noContent()
    return new Response('not found', { status: 404 })
  }

  const heartbeatMatch = path.match(/^\/api\/v1\/explorers\/([^/]+)\/([^/]+)\/heartbeat$/)
  if (heartbeatMatch) return json({ remainingSeconds: 600, phase: 'Running' })

  const actionMatch = path.match(/^\/api\/v1\/explorers\/([^/]+)\/([^/]+)\/(wake|sleep)$/)
  if (actionMatch && method === 'POST') return noContent()

  if (path === '/api/v1/explorers' && method === 'POST') return json({}, 201)

  const explorerMatch = path.match(/^\/api\/v1\/explorers\/([^/]+)\/([^/]+)$/)
  if (explorerMatch && method === 'GET') {
    const ex = mockExplorers.find(e => (e.metadata as any).namespace === decodeURIComponent(explorerMatch[1]) && (e.metadata as any).name === decodeURIComponent(explorerMatch[2]))
    return ex ? json(ex) : json({ error: 'not found' }, 404)
  }

  if (path === '/api/v1/explorers' && method === 'GET') return json(mockExplorers)

  return null
}

export function installFetchInterceptor(): void {
  const origFetch = window.fetch.bind(window)
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const req = typeof input === 'string' ? new Request(input, init) : input instanceof URL ? new Request(input, init) : input
    const url = new URL(req.url)
    const method = req.method.toUpperCase()
    const body = method === 'POST' || method === 'PUT' ? await req.clone().text().catch(() => undefined) : undefined
    const mock = handleRequest(method, url.pathname, url, body)
    if (mock) return mock
    return origFetch(req)
  }
}
