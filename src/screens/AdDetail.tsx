/* eslint-disable camelcase */
import {
  FlatList,
  HStack,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  View,
  useTheme,
  useToast,
} from 'native-base'

import { Header } from '../components/Header'
import { Avatar } from '../components/Avatar'
import { TagComponent } from '../components/TagComponent'
import { PaymantChose } from '../components/PaymantChose'
import { Button } from '../components/Button'
import { HeaderPreAd } from '../components/HeaderPreAd'
import { BottomMenu } from '../components/BottomMenu'

import {
  ArrowLeft,
  Power,
  TrashSimple,
  WhatsappLogo,
  Tag,
} from 'phosphor-react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'

import { api } from '../services/api'
import { AppError } from '../utils/AppErros'

import { useEffect, useState } from 'react'

type productImageProps = {
  id: string
  path: string
}

type userAdDetail = {
  avatar: string
  name: string
  tel: string
}

type paymantMethodsProps = {
  key: 'boleto' | 'pix' | 'cash' | 'card' | 'deposit'
}

type RoutesParametersProps = {
  active: boolean
  preAd: boolean
  userEditAd: boolean
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  paymant_methods: paymantMethodsProps[]
  setGroupValue?: React.Dispatch<React.SetStateAction<string[]>>
  product_images: productImageProps[]
  userAdDetail: userAdDetail
  id: string
  resetForm?: () => void
}

export function AdDetail() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdActive, setIsAdActive] = useState<boolean>()

  const route = useRoute()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { user } = useAuth()

  const toast = useToast()

  const { createProduct, createAdImage, changeAdStatus, deleteAd } =
    useProducts()

  const {
    active,
    preAd,
    userEditAd,
    name,
    description,
    is_new,
    price,
    accept_trade,
    paymant_methods,
    setGroupValue,
    product_images,
    userAdDetail,
    id,
    resetForm,
  } = route.params as RoutesParametersProps

  const { colors } = useTheme()

  function handleGoBack() {
    navigation.navigate('createAd')
  }

  async function handleCreateAd() {
    try {
      setIsLoading(true)

      await createProduct(
        name,
        description,
        is_new,
        price,
        accept_trade,
        paymant_methods,
      )

      toast.show({
        title: 'Anúncio criado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      })

      setGroupValue([])
      resetForm()

      navigation.goBack()
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível criar o aúncio, tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleChangeAdStatus(id: string, is_active: boolean) {
    try {
      setIsLoading(true)

      await changeAdStatus(id, is_active)

      setIsAdActive(is_active)

      toast.show({
        title: `Anúncio ${is_active ? 'Ativado' : 'Desativado'}`,
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : `Não foi possível ${
            is_new ? 'desativar' : 'ativar'
          } o aúncio, tente novamente mais tarde.`

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeleteAd(id: string) {
    try {
      setIsLoading(true)
      await deleteAd(id)

      navigation.goBack()

      toast.show({
        title: `Anúncio deletado com sucesso.`,
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : `Não foi possível deletar o aúncio, tente novamente mais tarde.`

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsAdActive(active)
  }, [])

  return (
    <ScrollView bg={'gray.600'}>
      {preAd ? (
        <HeaderPreAd />
      ) : userEditAd ? (
        <Header iconRight="pencil" backToMyAdsButton />
      ) : (
        <Header backToHomeButton />
      )}

      {preAd ? (
        <FlatList
          data={createAdImage}
          keyExtractor={(image) => image.assets[0].uri}
          w={'full'}
          horizontal={true}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.assets[0].uri }}
              height={72}
              width={'400px'}
              alt="Product Image"
            />
          )}
        />
      ) : (
        <FlatList
          data={product_images}
          keyExtractor={(image) => image.id}
          w={'full'}
          horizontal={true}
          renderItem={({ item }) => (
            <Image
              source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
              height={72}
              width={'400px'}
              alt="Product Image"
            />
          )}
        />
      )}

      <VStack px={6}>
        <HStack mt={5} space={2}>
          <Avatar
            variant="normal"
            imageSize={'28px'}
            avatarImage={
              preAd
                ? `${api.defaults.baseURL}/images/${user.avatar}`
                : `${api.defaults.baseURL}/images/${userAdDetail.avatar}`
            }
          />
          <Text color={'gray.100'} fontSize={'sm'} fontFamily={'body'}>
            {preAd ? user.name : userAdDetail.name}
          </Text>
        </HStack>

        <TagComponent w={'60px'} title={is_new ? 'novo' : 'usado'} mt={6} />

        <HStack justifyContent={'space-between'} mt={'10px'}>
          <Heading color={'gray.100'} fontFamily={'heading'} fontSize={'lg'}>
            {name}
          </Heading>
          <HStack alignItems={'baseline'} space={1}>
            <Text color={'blue.700'} fontFamily={'heading'} fontSize={'sm'}>
              R$
            </Text>
            <Text color={'blue.700'} fontFamily={'heading'} fontSize={'lg'}>
              {price}
            </Text>
          </HStack>
        </HStack>

        <Text mt={2} color={'gray.200'} fontFamily={'body'} fontSize={'sm'}>
          {description}
        </Text>

        <HStack mt={6} alignItems={'center'} space={2}>
          <Heading color={'gray.200'} fontFamily={'heading'} fontSize={'sm'}>
            Aceita troca?
          </Heading>
          <Text color={'gray.200'} fontFamily={'body'} fontSize={'sm'}>
            {accept_trade ? 'Sim' : 'Não'}
          </Text>
        </HStack>

        <Heading
          mt={4}
          color={'gray.200'}
          fontFamily={'heading'}
          fontSize={'sm'}
        >
          Meios de pagamento:
        </Heading>

        {paymant_methods.map((paymant) => (
          <View mt={2} key={paymant.key}>
            <PaymantChose
              paymant={preAd ? paymant : paymant.key}
              key={preAd ? paymant : paymant.key}
            />
          </View>
        ))}
      </VStack>
      {preAd ? (
        <BottomMenu
          mt={'10px'}
          buttonTitle1="Voltar e editar"
          buttonFunction1={handleGoBack}
          varianButton1="gray-light"
          leftIcon1={
            <ArrowLeft size={16} weight="bold" color={colors.gray[200]} />
          }
          buttonTitle2="Publicar"
          buttonFunction2={handleCreateAd}
          isLoading2={isLoading}
          varianButton2="blue-light"
          leftIcon2={<Tag size={16} weight="bold" color={colors.gray[600]} />}
        />
      ) : userEditAd ? (
        <VStack px={6} mt={'32px'} pb={'30px'} space={'8px'}>
          <Button
            title={isAdActive ? 'Desativar anúncio' : 'Reativar anúncio'}
            isLoading={isLoading}
            variant={'blue-light'}
            leftIcon={<Power size={16} color={colors.gray[700]} />}
            onPress={() => handleChangeAdStatus(id, !isAdActive)}
          />
          <Button
            title="Excluir anúncio"
            isLoading={isLoading}
            onPress={() => handleDeleteAd(id)}
            variant={'gray-light'}
            leftIcon={<TrashSimple size={16} color={colors.gray[200]} />}
          />
        </VStack>
      ) : (
        <HStack
          bg={'gray.700'}
          justifyContent={'space-between'}
          mt={7}
          px={6}
          pt={5}
          pb={7}
          alignItems={'center'}
        >
          <HStack alignItems={'baseline'} space={1}>
            <Text color={'blue.700'} fontFamily={'heading'} fontSize={'sm'}>
              R$
            </Text>
            <Text color={'blue.700'} fontFamily={'heading'} fontSize={'lg'}>
              {price}
            </Text>
          </HStack>

          <Button
            variant={'blue-light'}
            title="Entrar em contato"
            leftIcon={
              <WhatsappLogo size={16} color={colors.white} weight="fill" />
            }
            buttonSize={'169px'}
          />
        </HStack>
      )}
    </ScrollView>
  )
}
