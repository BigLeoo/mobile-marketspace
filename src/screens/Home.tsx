import { Center, HStack, Heading, ScrollView, Text, VStack } from 'native-base'

import { HeaderHome } from '../components/HeaderHome'
import { ArrowRight, Tag } from 'phosphor-react-native'
import { Input } from '../components/Input'

export function Home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Center>
        <VStack>
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
            <Tag size={22} color={'#364D9D'} />

            <VStack>
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

            <Text fontFamily={'heading'} fontSize={'xs'} color={'blue.500'}>
              Meus anúncios
            </Text>

            <ArrowRight size={16} color="#364D9D" />
          </HStack>

          <Text>Compre produtos variados</Text>

          <Input />
        </VStack>
      </Center>
    </ScrollView>
  )
}
