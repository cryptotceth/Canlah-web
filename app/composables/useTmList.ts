import type { ComputedRef } from 'vue'

function isAstNode(v: any): boolean {
  return v && typeof v === 'object' && typeof v.type === 'number' && 'body' in v && 'loc' in v
}

function deepResolve(node: any, rt: (m: any) => string): any {
  if (node == null) return node
  if (isAstNode(node)) { try { return rt(node) } catch { return '' } }
  if (Array.isArray(node)) return node.map((n) => deepResolve(n, rt))
  if (typeof node === 'object') {
    const out: any = {}
    for (const k of Object.keys(node)) out[k] = deepResolve(node[k], rt)
    return out
  }
  return node
}

export function useTmList<T = any>(key: string): ComputedRef<T> {
  const { tm, rt } = useI18n()
  return computed(() => deepResolve(tm(key), rt) as T)
}
