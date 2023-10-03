import { createContext } from 'react'

export const availableThemes = [
  'light',
  'light_high_contrast',
  'light_protanopia',
  'dark',
  'dark_high_contrast',
  'dark_protanopia',
  'dark_dimmed',
  'transparent_dark',
  'preferred_color_scheme',
  'custom',
] as const

export type AvailableTheme = typeof availableThemes[number]

export type Theme = AvailableTheme | `/${string}` | `https://${string}`

interface IThemeContext {
  theme: Theme
  setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
})
