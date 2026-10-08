import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type ThemeChoice = 'light' | 'dark' | 'system'
const ThemeContext = createContext<{ theme: ThemeChoice; setTheme: (t: ThemeChoice) => void }>({
  theme: 'system',
  setTheme: () => {},
})

function initial(): ThemeChoice {
  try {
    const t = localStorage.getItem('ed-theme')
    if (t === 'light' || t === 'dark') return t
  } catch {
    /* ignore */
  }
  return 'system'
}

/** Sets `data-theme` on <html>. "system" removes it so prefers-color-scheme applies. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeChoice>(initial)
  useEffect(() => {
    const el = document.documentElement
    if (theme === 'system') delete el.dataset.theme
    else el.dataset.theme = theme
    try {
      if (theme === 'system') localStorage.removeItem('ed-theme')
      else localStorage.setItem('ed-theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
