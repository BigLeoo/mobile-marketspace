import {
  Actionsheet,
  Box,
  Center,
  Checkbox,
  FlatList,
  HStack,
  Heading,
  Spinner,
  Switch,
  Text,
  VStack,
  View,
  useDisclose,
  useTheme,
  useToast,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useCallback, useState } from 'react'

import { HeaderHome } from '../components/HeaderHome'
import { Input } from '../components/Input'
import { Ads } from '../components/Ads'
import { AdsInfo } from '../components/AdsInfo'
import { Button } from '../components/Button'
import { TagComponent } from '../components/TagComponent'

import { MagnifyingGlass, Sliders, X } from 'phosphor-react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'

import { AppError } from '../utils/AppErros'

import { AddDTO } from '../dtos/addDTO'

export function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeAds, setActiveAds] = useState<AddDTO[]>([])
  const [filterdAds, setFilteredAds] = useState<AddDTO[]>([])
  const [filterAdName, setFilterAdName] = useState('')

  const { fetchAds } = useProducts()

  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclose()

  const { colors } = useTheme()

  const { user } = useAuth()

  const { fetchAdDetail } = useProducts()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function handleAdDetail(id: string) {
    try {
      const data = await fetchAdDetail(id)

      console.log(data)

      navigation.navigate('adDetail', {
        active: true,
        preAd: false,
        name: data.name,
        description: data.description,
        is_new: data.is_new,
        price: data.price,
        accept_trade: data.accept_trade,
        paymant_methods: data.payment_methods,
        product_images: data.product_images,
        userAdDetail: data.user,
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os dados do anúncio, tente novamente mais tarde.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  async function GetAds() {
    try {
      setIsLoading(true)

      const data = await fetchAds()

      setActiveAds(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os anúncios, tente novamente mais tarde.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }
  // const { userToken } = useAuth()
  useFocusEffect(
    useCallback(() => {
      // console.log(userToken)

      GetAds()
    }, []),
  )

  function handleFilterAdsBySearchBar(filterName: string) {
    setIsLoading(true)

    const filteredAds = activeAds.filter((ad) =>
      ad.name.toLowerCase().includes(filterName),
    )

    setFilteredAds(filteredAds)

    setIsLoading(false)
  }

  return (
    <Center>
      <VStack px={6}>
        <HeaderHome userName={user.name} userAvatar={user.avatar} pt={8} />
        <Text fontFamily={'body'} fontSize={'sm'} color={'gray.300'} mt={8}>
          Seus produtos anunciados para venda
        </Text>
        <AdsInfo
          mt={3}
          numberOfMyAds={
            filterdAds.length > 0 ? filterdAds.length : activeAds.length
          }
        />
        <Text mt={8}>Compre produtos variados</Text>
        <Input
          w={'full'}
          placeholder="Buscar anúncio"
          onChangeText={(value) => setFilterAdName(value)}
          value={filterAdName}
          onSubmitEditing={() =>
            handleFilterAdsBySearchBar(filterAdName.toLowerCase())
          }
          InputRightElement={
            <HStack alignItems={'center'}>
              <TouchableOpacity
                onPress={() =>
                  handleFilterAdsBySearchBar(filterAdName.toLowerCase())
                }
              >
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
      {isLoading ? (
        <Center mt={'180px'}>
          <Spinner size={'lg'} color={colors.blue[700]} />
        </Center>
      ) : (
        <View w={'full'}>
          <FlatList
            ml={5}
            data={filterdAds.length > 0 ? filterdAds : activeAds}
            keyExtractor={(item) => item.id}
            numColumns={2}
            mt={6}
            maxH={85}
            minH={85}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View mr={4} mb={6}>
                <TouchableOpacity onPress={() => handleAdDetail(item.id)}>
                  <Ads
                    name={item.name}
                    price={item.price}
                    is_active={true}
                    is_new={item.is_new}
                    product_image={item.product_images}
                    avatar={item.user.avatar}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </Center>
  )
}
