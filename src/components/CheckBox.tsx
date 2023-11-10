import { TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'

import { Box, HStack, Text, useTheme } from 'native-base'
import { Check } from 'phosphor-react-native'
import { UseFormSetValue } from 'react-hook-form'

type checkBoxProps = {
  title: string
  value: string
  nameGroup: string
  setValue: UseFormSetValue<FormDataProps>
  getValues: (method: string) => void
  watchFormData: FormData
}

export function CheckBox({
  title,
  value,
  nameGroup,
  setValue,
  getValues,
  watchFormData,
}: checkBoxProps) {
  const [isActive, setIsActive] = useState<boolean>(false)

  const { colors } = useTheme()

  const handleCheckTheBox = () => {
    setIsActive((prevState) => !prevState)
  }

  useEffect(() => {
    const paymentMethodsFromFormData = getValues(nameGroup)

    const filterPaymantDuplicates = new Set()

    paymentMethodsFromFormData.forEach((item) => {
      filterPaymantDuplicates.add(item)
    })

    const paymentMethods = [...filterPaymantDuplicates.values()]

    setValue(nameGroup, paymentMethods)

    if (isActive) {
      setValue(nameGroup, [...paymentMethods, value], {
        shouldValidate: true,
      })
    } else {
      setValue(
        nameGroup,
        paymentMethods.filter((item) => item !== value),
      )
    }
  }, [isActive])

  useEffect(() => {
    const paymentMethodsFromFormData = getValues(nameGroup)

    if (paymentMethodsFromFormData.length === 0) {
      setIsActive(false)
    } else {
      paymentMethodsFromFormData?.forEach((item) => {
        if (item === value) {
          setIsActive(true)
        }
      })
    }
  }, [watchFormData])

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
