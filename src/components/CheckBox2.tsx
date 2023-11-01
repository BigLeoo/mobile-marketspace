import { TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'

import { Box, HStack, Text, useTheme } from 'native-base'
import { Check } from 'phosphor-react-native'
import { UseFormSetValue } from 'react-hook-form'

type checkBoxProps = {
  title: string
  value?: any
  onChangeCheckbox?: (value: any) => void
}

export function CheckBox2({ title, value, onChangeCheckbox }: checkBoxProps) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const { colors } = useTheme()

  const handleCheckTheBox = (value: any) => {
    setIsActive((prevState) => !prevState)
    if (onChangeCheckbox) {
      onChangeCheckbox(value)
    }
  }

  //   const objeto = {
  //     boleto: true,
  //     card: true,
  //     cash: true,
  //     deposit: false,
  //     pix: true,
  //   }

  //   const array = Object.entries(objeto)

  //   const metodosDePagamento = array
  //     .map(([key, value]) => {
  //       if (value) {
  //         return key
  //       }
  //       return null
  //     })
  //     .filter((v) => v !== null)

  //   console.log(metodosDePagamento)

  return (
    <TouchableOpacity onPress={() => handleCheckTheBox(value)}>
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
