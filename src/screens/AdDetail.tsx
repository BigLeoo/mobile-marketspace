/* eslint-disable camelcase */
import {
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
import ProductImage from '../../assets/shoes.png'

import { Header } from '../components/Header'
import { Avatar } from '../components/Avatar'
import { TagComponent } from '../components/TagComponent'
import { PaymantChose } from '../components/PaymantChose'
import { Button } from '../components/Button'

import {
  ArrowLeft,
  Power,
  TrashSimple,
  WhatsappLogo,
  Tag,
} from 'phosphor-react-native'
import { HeaderPreAd } from '../components/HeaderPreAd'
import { BottomMenu } from '../components/BottomMenu'
import { useNavigation, useRoute } from '@react-navigation/native'
import { paymant_methods } from '../dtos/paymantMethodsDTO'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'
import { useProducts } from '../hooks/useProducts'
import { AppError } from '../utils/AppErros'
import { useState } from 'react'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

type RoutesParametersProps = {
  active: boolean
  preAd: boolean
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  paymant_methods: paymant_methods[]
}

export function AdDetail() {
  const route = useRoute()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { user } = useAuth()

  const toast = useToast()

  const { createProduct, createAdImage } = useProducts()

  const {
    active,
    preAd,
    name,
    description,
    is_new,
    price,
    accept_trade,
    paymant_methods,
  } = route.params as RoutesParametersProps

  const { colors } = useTheme()

  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <ScrollView bg={'gray.600'}>
      {!preAd ? <Header backButton /> : <HeaderPreAd />}

      <Image
        source={{ uri: createAdImage[0].assets[0].uri }}
        height={72}
        width={'full'}
        alt="Product Image"
      />

      <VStack px={6}>
        <HStack mt={5} space={2}>
          <Avatar
            variant="normal"
            imageSize={'28px'}
            avatarImage={`${api.defaults.baseURL}/images/${user.avatar}`}
          />
          <Text color={'gray.100'} fontSize={'sm'} fontFamily={'body'}>
            {user.name}
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
          <View mt={2} key={paymant}>
            <PaymantChose paymant={paymant} key={paymant} />
          </View>
        ))}
      </VStack>
      {active ? (
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
      ) : preAd ? (
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
      ) : (
        <VStack px={6} mt={'32px'} pb={'30px'} space={'8px'}>
          <Button
            title="Reativar anúncio"
            variant={'blue-light'}
            leftIcon={<Power size={16} color={colors.gray[700]} />}
          />
          <Button
            title="Excluir anúncio"
            variant={'gray-light'}
            leftIcon={<TrashSimple size={16} color={colors.gray[200]} />}
          />
        </VStack>
      )}
    </ScrollView>
  )
}
