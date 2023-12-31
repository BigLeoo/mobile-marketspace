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
      600: '#E07878',
    },
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
  },
  fontSizes: {
    xxs: '10px',
    xs: '12px', // 12px
    sm: '14px', // 14px
    md: '16px', // 16px
    lg: '20px', // 20px
    xl: '24px', // 24px
  },
  sizes: {
    3.5: '14px', // 14px
    15: '56px',
    22: '88px',
    25: '100px',
    30: '139px',
    31: '124px', // 124px
    37: '152px',
    68: '279px', // 279px
    76: '303px',
    85: '365px',
  },
})
