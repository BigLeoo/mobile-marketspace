import { IInputProps, Input as NativeBaseInput } from 'native-base'

type Props = IInputProps & {
  variant?: 'shadow' | 'normal'
}

export function Input({ variant = 'normal', ...rest }: Props) {
  return (
    <NativeBaseInput
      w={'full'}
      // h={12}
      mt={4}
      px={4}
      py={3}
      bg={'gray.700'}
      borderRadius={6}
      backgroundColor={'gray.700'}
      borderWidth={'0'}
      _focus={{ borderWidth: 1, borderColor: 'gray.300' }}
      shadow={variant === 'shadow' ? '6' : 'none'}
      color={'gray.200'}
      fontFamily={'body'}
      fontSize={'md'}
      {...rest}
    ></NativeBaseInput>
  )
}
