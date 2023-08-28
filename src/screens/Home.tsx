import {
  Actionsheet,
  Box,
  Center,
  Checkbox,
  FlatList,
  HStack,
  Heading,
  Switch,
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
import { Button } from '../components/Button'
import { TagComponent } from '../components/TagComponent'

import { MagnifyingGlass, Sliders, X } from 'phosphor-react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { api } from '../services/api'
import { useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'

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

  const { colors } = useTheme()

  const { user } = useAuth()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleAdDetail() {
    navigation.navigate('adDetail')
  }

  async function fetchMyAds() {
    console.log(user)

    // const data = await api.get('/products', {
    //   headers: `Bearer ${user.token}`,
    // })

    // console.log(data)
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyAds()
    }, []),
  )

  return (
    <Center>
      <VStack px={6}>
        <HeaderHome pt={8} />

        <Text fontFamily={'body'} fontSize={'sm'} color={'gray.300'} mt={8}>
          Seus produtos anunciados para venda
        </Text>

        <AdsInfo mt={3} numberOfMyAds="1" />

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
            <Box>
              <HStack>
                <Heading
                  color={'gray.100'}
                  fontFamily={'heading'}
                  fontSize={'lg'}
                  width={76}
                >
                  Filtrar anúncios
                </Heading>

                <TouchableOpacity onPress={onClose}>
                  <X size={24} color={colors.gray[400]} />
                </TouchableOpacity>
              </HStack>

              <Text
                color={'gray.200'}
                fontFamily={'heading'}
                fontSize={'sm'}
                mt={6}
                mb={3}
              >
                Condição
              </Text>

              <HStack>
                <TagComponent title="NOVO" selected />
                <TagComponent title="USADO" marginLeft={2} selected={false} />
              </HStack>

              <Text
                color={'gray.200'}
                fontFamily={'heading'}
                fontSize={'sm'}
                mt={6}
              >
                Aceita troca?
              </Text>

              <Switch
                alignSelf={'flex-start'}
                size={'lg'}
                onTrackColor={'blue.700'}
              />

              <Text
                color={'gray.200'}
                fontFamily={'heading'}
                fontSize={'sm'}
                pb={3}
              >
                Meios de pagamento aceitos
              </Text>

              <VStack space={2}>
                <Checkbox
                  value="boleto"
                  _checked={{
                    backgroundColor: 'blue.700',
                    borderColor: 'blue.700',
                  }}
                >
                  Boleto
                </Checkbox>
                <Checkbox
                  value="Pix"
                  _checked={{
                    backgroundColor: 'blue.700',
                    borderColor: 'blue.700',
                  }}
                >
                  Pix
                </Checkbox>
                <Checkbox
                  value="Dinheiro"
                  _checked={{
                    backgroundColor: 'blue.700',
                    borderColor: 'blue.700',
                  }}
                >
                  Dinheiro
                </Checkbox>
                <Checkbox
                  value="Cartão de Crédito"
                  _checked={{
                    backgroundColor: 'blue.700',
                    borderColor: 'blue.700',
                  }}
                >
                  Cartão de Crédito
                </Checkbox>
                <Checkbox
                  value="Depósito Bancário"
                  _checked={{
                    backgroundColor: 'blue.700',
                    borderColor: 'blue.700',
                  }}
                >
                  Cartão de Débito
                </Checkbox>
              </VStack>

              <HStack mt={16} mb={8} space={3}>
                <Button
                  title="Resetar filtros"
                  variant={'gray-light'}
                  buttonSize={40}
                />
                <Button
                  title="Aplicar filtros"
                  onPress={onClose}
                  variant={'gray-dark'}
                  buttonSize={40}
                />
              </HStack>
            </Box>
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
            <TouchableOpacity onPress={handleAdDetail}>
              <Ads name={item.name} price={item.price} state={item.state} />
            </TouchableOpacity>
          </View>
        )}
      />
    </Center>
  )
}
