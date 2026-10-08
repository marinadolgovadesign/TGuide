import { useCallback, useEffect, useState } from 'react'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw == null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

/** useState persisted to localStorage (namespaced `ed-`). Falls back silently when storage is unavailable. */
export function useLocalStorage<T>(key: string, initial: T) {
  const fullKey = `ed-${key}`
  const [value, setValue] = useState<T>(() => read(fullKey, initial))

  useEffect(() => {
    try {
      localStorage.setItem(fullKey, JSON.stringify(value))
    } catch {
      /* storage blocked: keep in memory */
    }
  }, [fullKey, value])

  const update = useCallback((next: T | ((prev: T) => T)) => setValue(next), [])
  return [value, update] as const
}
