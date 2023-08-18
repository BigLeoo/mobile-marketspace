import { HStack, Heading, Image, Text, VStack, View } from 'native-base'

import tenisPng from '../../assets/shoes.png'

import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import { Avatar } from './Avatar'
import { ProductState } from './ProductState'

type AdsProps = IVStackProps & {
  name: string
  state: 'used' | 'new'
  price: number | string
}

export function Ads({ name, state, price, ...rest }: AdsProps) {
  return (
    <VStack {...rest} width={37}>
      <View position={'relative'}>
        <Image
          source={tenisPng}
          alt="Anúncio do usuário"
          width={37}
          height={25}
          borderRadius={6}
        />

        <Avatar
          imageSize={8}
          borderImageColor="white"
          avatarImage={'https://github.com/BigLeoo.png'}
          zIndex={12}
          top={-95}
          left={1}
          position={'absolute'}
        />

        <ProductState
          position={'absolute'}
          left={99}
          top={2}
          ProductState={state}
        />
      </View>

      <VStack>
        <Text color={'gray.200'} fontFamily={'body'} fontSize={'sm'}>
          {name}
        </Text>

        <HStack alignItems={'center'}>
          <Heading color={'gray.200'} fontFamily={'heading'} fontSize={'xs'}>
            R${' '}
          </Heading>

          <Heading fontFamily={'heading'} color={'gray.100'} fontSize={'md'}>
            {price.toString()}
          </Heading>
        </HStack>
      </VStack>
    </VStack>
  )
}
