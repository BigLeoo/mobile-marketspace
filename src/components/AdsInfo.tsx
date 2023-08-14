import { HStack, Heading, Text, VStack } from 'native-base'
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'
import { ArrowRight, Tag } from 'phosphor-react-native'

type AdsInfoProps = IHStackProps

export function AdsInfo({ ...rest }: AdsInfoProps) {
  return (
    <HStack
      {...rest}
      backgroundColor={'rgba(100, 122, 199, 0.1)'}
      alignItems={'center'}
      justifyContent={'space-between'}
      rounded={6}
      py={3}
      px={4}
    >
      <HStack alignItems={'center'}>
        <Tag size={22} color={'#364D9D'} />

        <VStack ml={4}>
          <Heading fontFamily={'heading'} fontSize={'lg'} color={'gray.200'}>
            4
          </Heading>

          <Text fontFamily={'body'} fontSize={'xs'} color={'gray.200'}>
            anúncios ativos
          </Text>
        </VStack>
      </HStack>

      <HStack>
        <Text fontFamily={'heading'} fontSize={'xs'} color={'blue.500'} mr={2}>
          Meus anúncios
        </Text>

        <ArrowRight size={16} color="#364D9D" />
      </HStack>
    </HStack>
  )
}
