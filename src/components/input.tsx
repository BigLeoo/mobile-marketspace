import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
  Pressable,
} from 'native-base'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useState } from 'react'

type Props = IInputProps & {
  variant?: 'shadow' | 'normal'
  inputType?: 'normal' | 'password'
  errorMessage?: string | null
}

export function Input({
  errorMessage = null,
  isInvalid,
  inputType = 'normal',
  variant = 'normal',
  ...rest
}: Props) {
  const [passordVisibility, setPassordVisibility] = useState(false)

  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        w={'full'}
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
        type={
          inputType === 'password'
            ? passordVisibility
              ? 'text'
              : 'password'
            : 'text'
        }
        InputRightElement={
          <Pressable
            onPress={() => setPassordVisibility(!passordVisibility)}
            mr={4}
          >
            {inputType === 'normal' ? (
              <></>
            ) : passordVisibility ? (
              <Eye size={20} />
            ) : (
              <EyeSlash size={20} />
            )}
          </Pressable>
        }
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
