import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string
  variant: 'blue-light' | 'gray-light' | 'gray-dark'
  buttonSize?: 'full' | number | string
}

export function Button({
  title,
  variant,
  buttonSize = 'full',
  ...rest
}: ButtonProps) {
  return (
    <ButtonNativeBase
      {...rest}
      p={3}
      bg={
        variant === 'blue-light'
          ? 'blue.700'
          : variant === 'gray-light'
          ? 'gray.500'
          : 'gray.100'
      }
      w={buttonSize}
      borderRadius={6}
      _pressed={
        variant === 'blue-light'
          ? { backgroundColor: 'blue.500' }
          : variant === 'gray-light'
          ? { backgroundColor: 'gray.400' }
          : { backgroundColor: 'gray.200' }
      }
    >
      <Text
        color={
          variant === 'blue-light'
            ? 'gray.700'
            : variant === 'gray-light'
            ? 'gray.200'
            : 'gray.700'
        }
        fontSize={'sm'}
        fontFamily={'heading'}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
