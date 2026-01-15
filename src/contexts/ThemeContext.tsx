import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { DEFAULT_THEME, DEFAULT_UI_SCALE } from '../config/defaults'

type Theme = 'light' | 'dark'
type UIScale = '150' | '133' | '100' | '90' | '80' | '75'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  uiScale: UIScale
  setUIScale: (scale: UIScale) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      return savedTheme
    }
    return DEFAULT_THEME
  })

  const [uiScale, setUIScaleState] = useState<UIScale>(() => {
    const savedScale = localStorage.getItem('uiScale') as UIScale | null
    return savedScale || DEFAULT_UI_SCALE
  })

  useEffect(() => {

    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const scaleValue = parseInt(uiScale) / 100
    document.documentElement.style.fontSize = `${scaleValue * 16}px`
    localStorage.setItem('uiScale', uiScale)
  }, [uiScale])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const setUIScale = (scale: UIScale) => {
    setUIScaleState(scale)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, uiScale, setUIScale }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
