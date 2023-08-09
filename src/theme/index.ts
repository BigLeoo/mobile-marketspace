import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  colors: {
    blue: {
      700: '#647AC7',
      500: '#364D9D',
    },
    gray: {
      700: '#F7F7F8',
      600: '#EDECEE',
      500: '#D9D8DA',
      400: '#9F9BA1',
      300: '#5F5B62',
      200: '#3E3A40',
      100: '#1A181B',
    },
    white: '#FFFFFF',
    red: {
      700: '#EE7979',
    },
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
  },
  fontSizes: {
    xs: 12, // 12px
    sm: 14, // 14px
    md: 16, // 16px
    lg: 20, // 20px
    xl: 24, // 24px
  },
  sizes: {
    3.5: 14, // 14px
    15: 56,
    22: 88,
    31: 124, // 124px
    68: 279, // 279px
  },
})
