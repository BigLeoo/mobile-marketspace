import { TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'

import { Box, HStack, Text, useTheme } from 'native-base'
import { Check } from 'phosphor-react-native'

type checkBoxProps = {
  title: string
  value: string
  setValue: () => void
  getValues: (method: string) => void
}

export function CheckBox({ title, value, setValue, getValues }: checkBoxProps) {
  const [isActive, setIsActive] = useState<boolean>(false)

  const { colors } = useTheme()

  const handleCheckTheBox = () => {
    setIsActive((prevState) => !prevState)
  }

  useEffect(() => {
    const paymantMethods = getValues('paymant_methods')

    if (isActive) {
      setValue('paymant_methods', [...paymantMethods, value])
    } else {
      setValue(
        'paymant_methods',
        paymantMethods.filter((item) => item !== value),
      )
    }
  }, [isActive])

  useEffect(() => {
    const paymantMethods = getValues('paymant_methods')

    paymantMethods?.forEach((item) => {
      if (item === value) {
        setIsActive((prevState) => !prevState)
      }
    })
  }, [])

  return (
    <TouchableOpacity onPress={handleCheckTheBox}>
      <HStack space={'8px'} alignItems={'center'}>
        <Box
          w={'22px'}
          h={'22px'}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={isActive ? 'blue.700' : 'gray.600'}
          borderColor={isActive ? 'blue.700' : 'gray.400'}
          borderWidth={'3px'}
          borderRadius={'md'}
        >
          {isActive ? (
            <Check size={'15px'} weight="bold" color={colors.gray[700]} />
          ) : (
            <></>
          )}
        </Box>
        <Text color={'gray.200'} fontFamily={'body'} fontSize={'md'}>
          {title}
        </Text>
      </HStack>
    </TouchableOpacity>
  )
}
