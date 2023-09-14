import { HStack, Text, View, useTheme } from 'native-base'

import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'
import { XCircle } from 'phosphor-react-native'

type TagComponentProps = IHStackProps & {
  title: string
  selected?: boolean
  statusSize?: 'string'
}

export function TagComponent({
  title,
  selected,
  statusSize,
  ...rest
}: TagComponentProps) {
  const { colors } = useTheme()
  return (
    <HStack
      px={title === 'novo' ? 2 : 1}
      py={'2px'}
      borderRadius={'9999px'}
      bg={selected ? 'blue.700' : 'gray.500'}
      justifyContent={'center'}
      alignItems={'center'}
      {...rest}
    >
      <Text
        color={selected ? 'gray.600' : 'gray.300'}
        fontFamily={'heading'}
        fontSize={statusSize || 'xs'}
        ml={'6px'}
        pr={1}
      >
        {title.toLocaleUpperCase()}
      </Text>

      {selected ? (
        <View ml={1}>
          <XCircle size={16} weight="fill" color={colors.gray[600]} />
        </View>
      ) : (
        <></>
      )}
    </HStack>
  )
}
