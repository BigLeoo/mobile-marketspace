import { HStack, Text } from 'native-base'
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'

type PaymantChoseProps = IHStackProps & {
  title: string
  leftIcon: JSX.Element
}

export function PaymantChose({ title, leftIcon, ...rest }: PaymantChoseProps) {
  return (
    <HStack space={2} {...rest} mb={1}>
      {leftIcon}
      <Text color={'gray.200'} fontFamily={'body'} fontSize={'sm'}>
        {title}
      </Text>
    </HStack>
  )
}
