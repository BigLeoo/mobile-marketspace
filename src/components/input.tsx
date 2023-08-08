import { IInputProps, Input as NativeBaseInput } from 'native-base'

type Props = IInputProps & {}

export function Input({ ...rest }: Props) {
  return (
    <NativeBaseInput
      borderRadius={6}
      backgroundColor={'gray.700'}
      _focus={{ borderWidth: 1, borderColor: 'gray.300' }}
      {...rest}
    ></NativeBaseInput>
  )
}
