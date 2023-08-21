import { Box, HStack, Heading, Image, Text, VStack, View } from 'native-base'

import tenisPng from '../../assets/shoes.png'

import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import { Avatar } from './Avatar'
import { ProductState } from './ProductState'

type AdsProps = IVStackProps & {
  name: string
  state: 'used' | 'new'
  active: boolean
  price: number | string
}

export function Ads({ name, state, price, active = true, ...rest }: AdsProps) {
  return (
    <VStack {...rest} width={'162px'}>
      <View position={'relative'}>
        <Image
          source={tenisPng}
          alt="Anúncio do usuário"
          width={'162px'}
          height={'100px'}
          borderRadius={6}
        />

        {active ? (
          <Avatar
            imageSize={8}
            borderImageColor="white"
            avatarImage={'https://github.com/BigLeoo.png'}
            zIndex={12}
            top={-95}
            left={1}
            position={'absolute'}
          />
        ) : (
          <></>
        )}

        <ProductState
          position={'absolute'}
          left={105}
          top={2}
          ProductState={state}
        />

        {!active ? (
          <View w={'full'} height={'100px'} position={'absolute'}>
            <Box
              w={'full'}
              height={'100px'}
              opacity={'0.5'}
              background={'gray.100'}
              position={'absolute'}
            ></Box>
            <Text
              position={'absolute'}
              color={'gray.700'}
              fontFamily={'heading'}
              fontSize={'11px'}
              bottom={'8px'}
              left={'8px'}
              zIndex={1}
            >
              ANÚNCIO DESATIVADO
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>

      <VStack pl={'2px'}>
        <Text
          color={active ? 'gray.200' : 'gray.400'}
          fontFamily={'body'}
          fontSize={'sm'}
        >
          {name}
        </Text>

        <HStack alignItems={'center'}>
          <Heading
            color={active ? 'gray.200' : 'gray.400'}
            fontFamily={'heading'}
            fontSize={'xs'}
          >
            R${' '}
          </Heading>

          <Heading
            fontFamily={'heading'}
            color={active ? 'gray.100' : 'gray.400'}
            fontSize={'md'}
          >
            {price.toString()}
          </Heading>
        </HStack>
      </VStack>
    </VStack>
  )
}
