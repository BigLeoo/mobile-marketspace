import { TouchableOpacity } from 'react-native'
import { Box, HStack, Text, useTheme } from 'native-base'
import { Check } from 'phosphor-react-native'

type CheckBoxProps = {
  title: string
  value: boolean
  onChange: (value: boolean) => void
}

export function CheckBox3({ value, title, onChange }: CheckBoxProps) {
  function handleCheckTheBox() {
    if (onChange) {
      onChange(!value)
    }
  }

  const { colors } = useTheme()

  return (
    <TouchableOpacity onPress={handleCheckTheBox}>
      <HStack space={'8px'} alignItems={'center'}>
        <Box
          w={'22px'}
          h={'22px'}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={value ? 'blue.700' : 'gray.600'}
          borderColor={value ? 'blue.700' : 'gray.400'}
          borderWidth={'3px'}
          borderRadius={'md'}
        >
          {value ? (
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
