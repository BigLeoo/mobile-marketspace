import {
  Actionsheet,
  Center,
  FlatList,
  HStack,
  Heading,
  Text,
  VStack,
  View,
  useDisclose,
  useTheme,
} from 'native-base'
import { TouchableOpacity } from 'react-native'

import { HeaderHome } from '../components/HeaderHome'
import { Input } from '../components/Input'
import { Ads } from '../components/Ads'
import { AdsInfo } from '../components/AdsInfo'

import { MagnifyingGlass, Sliders, X } from 'phosphor-react-native'

const ProdutosVenda = [
  {
    name: 'Tenis Nike',
    state: 'used',
    price: '60,00',
  },
  {
    name: 'Teclado',
    state: 'new',
    price: '100,00',
  },
  {
    name: 'Mouse',
    state: 'used',
    price: '70,00',
  },
  {
    name: 'Monitor',
    state: 'used',
    price: '4000,00',
  },
  {
    name: 'Monitor',
    state: 'used',
    price: '4000,00',
  },
  {
    name: 'Monitor',
    state: 'new',
    price: '4000,00',
  },
  {
    name: 'Monitor',
    state: 'used',
    price: '4000,00',
  },
  {
    name: 'Monitor',
    state: 'used',
    price: '4000,00',
  },
  {
    name: 'Monitor',
    state: 'used',
    price: '4000,00',
  },
]

export function Home() {
  const { isOpen, onOpen, onClose } = useDisclose()

  const { colors, fonts, sizes } = useTheme()

  return (
    <Center>
      <VStack w={80}>
        <HeaderHome pt={8} />

        <Text fontFamily={'body'} fontSize={'sm'} color={'gray.300'} mt={8}>
          Seus produtos anunciados para venda
        </Text>

        <AdsInfo mt={3} />

        <Text mt={8}>Compre produtos variados</Text>

        <Input
          w={'full'}
          placeholder="Buscar anúncio"
          InputRightElement={
            <HStack alignItems={'center'}>
              <TouchableOpacity>
                <View px={3}>
                  <MagnifyingGlass size={20} color="#3E3A40" />
                </View>
              </TouchableOpacity>

              <Text color={'gray.400'} fontSize={'lg'}>
                |
              </Text>

              <TouchableOpacity onPress={onOpen}>
                <View pl={3} pr={4}>
                  <Sliders size={20} color="#3E3A40" />
                </View>
              </TouchableOpacity>
            </HStack>
          }
        />
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            {/* <HStack alignItems={'center'} justifyContent={'space-between'}> */}
            <Actionsheet.Item
              _text={{
                color: 'gray.100',
                size: '20px',
                fontFamily: 'heading',
              }}
              endIcon={<X size={24} color={colors.gray[400]} />}
            >
              Filtrar anúncio
            </Actionsheet.Item>
            {/* <Heading
                fontFamily={'heading'}
                fontSize={'lg'}
                color={'gray.100'}
              >
                Filtrar anúncio
              </Heading> */}

            {/* <X size={24} color={colors.gray[400]} /> */}
            {/* </HStack> */}

            <Text fontFamily={'body'} color={'gray.200'} fontSize={'sm'}>
              Condição
            </Text>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>

      <FlatList
        ml={5}
        data={ProdutosVenda}
        keyExtractor={(item) => item.name}
        numColumns={2}
        mt={6}
        maxH={85}
        minH={85}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View mr={4} mb={6}>
            <Ads name={item.name} price={item.price} state={item.state} />
          </View>
        )}
      />
    </Center>
  )
}
