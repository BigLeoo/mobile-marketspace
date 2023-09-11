import {
  Center,
  FlatList,
  HStack,
  Select,
  Text,
  VStack,
  View,
  useToast,
} from 'native-base'
import { Header } from '../components/Header'
import { TouchableOpacity } from 'react-native'
import { Ads } from '../components/Ads'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

import { AppError } from '../utils/AppErros'

import { useCallback, useEffect, useState } from 'react'
import { Loading } from '../components/Loading'

import { useProducts } from '../hooks/useProducts'
import { userAddDTO } from '../dtos/userAddDTO'
import { useAuth } from '../hooks/useAuth'

export function MyAds() {
  const [isLoading, setIsLoading] = useState(true)
  const [userAds, setUserAds] = useState<userAddDTO[]>([])
  const [filteredAds, setFilteredAds] = useState<userAddDTO[]>([])
  const [selectFilter, setSelectFilter] = useState('Todos')

  const { user } = useAuth()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const toast = useToast()

  const { fetchUserAds } = useProducts()

  async function fetchMyAds() {
    try {
      setIsLoading(true)

      const data = await fetchUserAds()

      setUserAds(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os seus anúncios, tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleAdDetail() {
    navigation.navigate('adDetail')
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyAds()
    }, []),
  )
  useEffect(() => {
    const filteredAds =
      selectFilter === 'Novo'
        ? userAds.filter((ad) => ad.is_new === true)
        : selectFilter === 'Usado'
        ? userAds.filter((ad) => ad.is_new === false)
        : selectFilter === 'Desativado'
        ? userAds.filter((ad) => ad.is_active === false)
        : userAds

    setFilteredAds(filteredAds)
  }, [selectFilter, userAds])

  return (
    <VStack>
      <Header title="Meus anúncios" iconRight="plus" />

      <VStack px={6} mt={8} pb={7}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Text>{filteredAds.length} anúncios</Text>
          <Select
            width={'111px'}
            height={'34px'}
            accessibilityLabel="Selecionar Filtro"
            placeholder="Selecionar Filtro"
            defaultValue="Todos"
            fontFamily={'body'}
            color={'gray.100'}
            fontSize={'sm'}
            onValueChange={(filterItem) => setSelectFilter(filterItem)}
          >
            <Select.Item label="Todos" value="Todos" />
            <Select.Item label="Novo" value="Novo" />
            <Select.Item label="Usado" value="Usado" />
            <Select.Item label="Anúncio Desativado" value="Desativado" />
          </Select>
        </HStack>

        {!isLoading ? (
          <FlatList
            mt={4}
            pt={2}
            maxH={'550px'}
            minH={'550px'}
            w={'full'}
            data={filteredAds}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View mr={5} mb={6}>
                <TouchableOpacity onPress={handleAdDetail}>
                  <Ads
                    name={item.name}
                    price={item.price}
                    is_new={item.is_new}
                    is_active={item.is_active}
                    product_image={item.product_images}
                    avatar={user.avatar}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Center mt={'70%'}>
            <Loading />
          </Center>
        )}
      </VStack>
    </VStack>
  )
}
