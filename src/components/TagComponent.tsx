import { TouchableOpacity } from 'react-native'
import { HStack, Text, View, useTheme } from 'native-base'

import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'
import { XCircle } from 'phosphor-react-native'

type TagComponentProps = IHStackProps & {
  title: string
  statusSize?: 'string'
  onChange?: (value: boolean) => void
  value?: boolean
}

export function TagComponent({
  title,
  statusSize,
  onChange,
  value,
  ...rest
}: TagComponentProps) {
  function handleActive() {
    if (onChange) {
      onChange(!value)
    }
  }

  const { colors } = useTheme()
  return (
    <TouchableOpacity onPress={handleActive}>
      <HStack
        px={title === 'novo' ? 2 : 1}
        py={'2px'}
        borderRadius={'9999px'}
        bg={value ? 'blue.700' : 'gray.500'}
        justifyContent={'center'}
        alignItems={'center'}
        {...rest}
      >
        <Text
          color={value ? 'gray.600' : 'gray.300'}
          fontFamily={'heading'}
          fontSize={statusSize || 'xs'}
          ml={'6px'}
          pr={1}
        >
          {title.toLocaleUpperCase()}
        </Text>

        {value ? (
          <View ml={1}>
            <XCircle size={16} weight="fill" color={colors.gray[600]} />
          </View>
        ) : (
          <></>
        )}
      </HStack>
    </TouchableOpacity>
  )
}
