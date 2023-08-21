import { FlatList, HStack, Select, Text, VStack, View } from 'native-base'
import { Header } from '../components/Header'
import { TouchableOpacity } from 'react-native'
import { Ads } from '../components/Ads'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

const ProdutosVenda = [
  {
    name: 'Tenis Nike',
    state: 'used',
    price: '60,00',
    active: false,
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
    active: false,
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
    active: false,
  },
  {
    name: 'Monitor Premium',
    state: 'used',
    price: '4000,00',
  },
]

export function MyAds() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleAdDetail() {
    navigation.navigate('adDetail')
  }

  return (
    <VStack>
      <Header title="Meus anúncios" iconRight="plus" />

      <VStack px={6} mt={8} pb={7}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Text>9 anúncios</Text>
          <Select
            width={'111px'}
            height={'34px'}
            accessibilityLabel="Selecionar Filtro"
            placeholder="Selecionar Filtro"
            defaultValue="Todos"
            fontFamily={'body'}
            color={'gray.100'}
            fontSize={'sm'}
          >
            <Select.Item label="Todos" value="Todos" />
            <Select.Item label="Novo" value="Novo" />
            <Select.Item label="Usado" value="Usado" />
            <Select.Item label="Anúncio Desativado" value="Desativado" />
          </Select>
        </HStack>

        <FlatList
          mt={4}
          pt={2}
          maxH={'550px'}
          minH={'550px'}
          w={'full'}
          data={ProdutosVenda}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View mr={5} mb={6}>
              <TouchableOpacity onPress={handleAdDetail}>
                <Ads
                  name={item.name}
                  price={item.price}
                  state={item.state}
                  active={item.active}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </VStack>
    </VStack>
  )
}
