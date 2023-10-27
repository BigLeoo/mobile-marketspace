import { TouchableOpacity } from 'react-native'
import { useCallback, useEffect, useState } from 'react'

import { Box, HStack, Text, useTheme } from 'native-base'
import { Check } from 'phosphor-react-native'
import { UseFormSetValue } from 'react-hook-form'
import { useFocusEffect } from '@react-navigation/native'

type checkBoxProps = {
  title: string
  value: string
  setValue: UseFormSetValue<FormDataProps>
  getValues: (method: string) => void
  formData: FormData
}

export function CheckBox({
  title,
  value,
  setValue,
  getValues,
  formData,
}: checkBoxProps) {
  const [isActive, setIsActive] = useState<boolean>(false)

  const { colors } = useTheme()

  const handleCheckTheBox = () => {
    setIsActive((prevState) => !prevState)
  }

  useEffect(() => {
    const paymantMethods = getValues('paymant_methods')

    if (isActive) {
      setValue('paymant_methods', [...paymantMethods, value], {
        shouldValidate: true,
      })
    } else {
      setValue(
        'paymant_methods',
        paymantMethods.filter((item) => item !== value),
      )
    }
  }, [isActive])

  // useFocusEffect(
  //   useCallback(() => {
  //     const paymentMethods = getValues('payment_methods') // Corrigi a variável paymentMethods e a chave 'payment_methods'

  //     paymentMethods?.forEach((item) => {
  //       if (item === value) {
  //         setIsActive((prevState) => !prevState)
  //       }
  //     })
  //   }, []),
  // )

  useEffect(() => {
    // console.log('teste!!!!')

    const paymentMethods = getValues('payment_methods') // Corrigi a variável paymentMethods e a chave 'payment_methods'

    console.log(paymentMethods)

    if (paymentMethods === undefined) {
      setIsActive(false)
    }

    paymentMethods?.forEach((item) => {
      if (item === value) {
        setIsActive((prevState) => !prevState)
      }
    })
  }, [formData])

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
