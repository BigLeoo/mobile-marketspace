import {
  Center,
  HStack,
  Heading,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base'

import { HeaderHome } from '../components/HeaderHome'

import {
  ArrowRight,
  MagnifyingGlass,
  Sliders,
  Tag,
} from 'phosphor-react-native'

import { Input } from '../components/Input'
import { Ads } from '../components/Ads'
import { Avatar } from '../components/Avatar'

export function Home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Center>
        <VStack w={80}>
          <HeaderHome pt={8} />

          <Text fontFamily={'body'} fontSize={'sm'} color={'gray.300'} mt={8}>
            Seus produtos anunciados para venda
          </Text>

          <HStack
            mt={3}
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
                <Heading
                  fontFamily={'heading'}
                  fontSize={'lg'}
                  color={'gray.200'}
                >
                  4
                </Heading>

                <Text fontFamily={'body'} fontSize={'xs'} color={'gray.200'}>
                  anúncios ativos
                </Text>
              </VStack>
            </HStack>

            <HStack>
              <Text
                fontFamily={'heading'}
                fontSize={'xs'}
                color={'blue.500'}
                mr={2}
              >
                Meus anúncios
              </Text>

              <ArrowRight size={16} color="#364D9D" />
            </HStack>
          </HStack>

          <Text mt={8}>Compre produtos variados</Text>

          <Input
            w={'full'}
            placeholder="Buscar anúncio"
            InputRightElement={
              <HStack alignItems={'center'}>
                <Pressable px={3}>
                  <MagnifyingGlass size={20} color="#3E3A40" />
                </Pressable>
                <Text color={'gray.400'} fontSize={'lg'}>
                  |
                </Text>
                <Pressable pl={3} pr={4}>
                  <Sliders size={20} color="#3E3A40" />
                </Pressable>
              </HStack>
            }
          />

          <Ads mt={6} />
        </VStack>
      </Center>
    </ScrollView>
  )
}
