import { TouchableOpacity } from 'react-native'
import { useEffect } from 'react'

import { Box, HStack, Text, VStack, useTheme } from 'native-base'
import { Check } from 'phosphor-react-native'

type checkBoxType = {
  name: string
  isActive: boolean
  value: string
}

type checkBoxProps = {
  checkBox: checkBoxType[]
  setCheckBox: (checkBox: checkBoxType) => void
  onChange: (method: any) => void
  value: string[]
}

export function MyCheckBox({
  checkBox,
  setCheckBox,
  onChange,
  value,
}: checkBoxProps) {
  const { colors } = useTheme()

  function updateIsActiveCheckBox(checkBoxToUpdate: checkBoxType) {
    const updatedCheckBox = checkBox.map((item) => {
      if (checkBoxToUpdate.name === item.name) {
        return { ...item, isActive: !item.isActive }
      }
      return item
    })

    setCheckBox(updatedCheckBox)
  }

  function updateValue(checkBoxValue: checkBoxType) {
    const paymantValuesArray = checkBoxValue
      .filter((item) => item.isActive === true) // Filtra apenas itens com isActive === true
      .map((item) => item.name)

    onChange(paymantValuesArray)
  }

  useEffect(() => {
    updateValue(checkBox)
  }, [checkBox])

  return (
    <VStack space={'8px'}>
      {checkBox.map((item) => (
        <TouchableOpacity
          key={item.name}
          onPress={() => {
            updateIsActiveCheckBox(item)
          }}
        >
          <HStack key={item.name} space={'8px'} alignItems={'center'}>
            <Box
              w={'22px'}
              h={'22px'}
              alignItems={'center'}
              justifyContent={'center'}
              backgroundColor={item.isActive ? 'blue.700' : 'gray.600'}
              borderColor={item.isActive ? 'blue.700' : 'gray.400'}
              borderWidth={'3px'}
              borderRadius={'md'}
            >
              {item.isActive ? (
                <Check size={'15px'} weight="bold" color={colors.gray[700]} />
              ) : (
                <></>
              )}
            </Box>
            <Text
              key={item.name}
              color={'gray.200'}
              fontFamily={'body'}
              fontSize={'md'}
            >
              {item.name}
            </Text>
          </HStack>
        </TouchableOpacity>
      ))}
    </VStack>
  )
}
