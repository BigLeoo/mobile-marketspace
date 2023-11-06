/* eslint-disable camelcase */
import {
  HStack,
  Heading,
  Radio,
  ScrollView,
  Switch,
  Text,
  VStack,
  useToast,
} from 'native-base'

import { Header } from '../components/Header'
import { AdImageSelector } from '../components/AdImageSelector'
import { Input } from '../components/Input'
import { BottomMenu } from '../components/BottomMenu'
import { TextArea } from '../components/TextArea'
import { CheckBox } from '../components/CheckBox'

import { useState, useEffect, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import { signUpSchema } from '../form/CreateAdFormValidation'

import { AppError } from '../utils/AppErros'
import {
  AppNavigatorRoutesProps,
  createAdRouteParameters,
} from '../routes/app.routes'
import { paymantMethodsDTO } from '../dtos/paymantMethodsDTO'
import { useProducts } from '../hooks/useProducts'
// import { CheckBox2 } from '../components/CheckBox2'

type FormDataProps = {
  name: string
  description: string
  is_new: string
  price: number
  accept_trade: boolean
  paymant_methods: paymantMethodsDTO[]
  // paymant_methods2: {
  //   pix?: boolean
  //   boleto?: boolean
  //   card?: boolean
  //   deposit?: boolean
  //   cash?: boolean
  // }
  // paymant_methods3: string[]
}

export function CreateAd() {
  const [isLoading, setIsLoading] = useState(false)

  const route = useRoute()

  // const { isEditingAd = false } = route.params as createAdRouteParameters
  const { isEditingAd } = route.params as createAdRouteParameters

  const {
    createAdImage,
    editAdData,
    setEditAdData,
    editAd,
    deleteImage,
    imagesToDelete,
  } = useProducts()

  const toast = useToast()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const defaulFormValues = {
    name: editAdData.name ? editAdData.name : null,
    description: editAdData.description ? editAdData.description : null,
    is_new:
      editAdData.is_new === undefined ? 'true' : editAdData.is_new.toString(),
    price: editAdData.price ? editAdData.price.toString() : null,
    accept_trade:
      editAdData.accept_trade === undefined ? null : editAdData.accept_trade,
    paymant_methods:
      editAdData.payment_methods === undefined
        ? []
        : editAdData.payment_methods,
    // paymant_methods2: {
    //   // pix: true,
    // },
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<FormDataProps>({
    defaultValues: defaulFormValues,
    resolver: yupResolver(signUpSchema),
  })

  // console.log(errors, 'ERROR')

  const WatchformData = watch('paymant_methods')

  function handlePreAd({
    name,
    description,
    is_new,
    price,
    accept_trade,
    paymant_methods, // paymant_methods2,
  }: FormDataProps) {
    try {
      setIsLoading(true)

      if (createAdImage.length === 0) {
        toast.show({
          title: 'Por favor, adicione pelo menos uma imagem do produto.',
          placement: 'top',
          bgColor: 'red.500',
        })

        return
      }

      navigation.navigate('adDetail', {
        active: false,
        preAd: true,
        userEditAd: false,
        name,
        description,
        is_new,
        price,
        accept_trade,
        paymant_methods,
        resetForm: () => reset(defaulFormValues),
      })
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

  async function handleEditAd({
    name,
    description,
    is_new,
    price,
    accept_trade,
    paymant_methods,
  }: FormDataProps) {
    const filterPaymantDuplicates = new Set()

    paymant_methods.forEach((item) => {
      filterPaymantDuplicates.add(item)
    })

    const paymentMethods = [...filterPaymantDuplicates.values()]

    try {
      setIsLoading(true)

      console.log(imagesToDelete)

      if (imagesToDelete.length > 0) {
        await deleteImage(imagesToDelete)
      }

      await await editAd(
        editAdData.id,
        name,
        description,
        is_new,
        price,
        accept_trade,
        paymentMethods,
      )

      navigation.navigate('myAds')

      toast.show({
        title: 'Anúncio editado com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível editar o aúncio, tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleCancelForm() {
    setEditAdData({})
    reset(defaulFormValues)
    navigation.goBack()
  }

  useEffect(() => {
    reset(defaulFormValues)
  }, [editAdData])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header
        title={isEditingAd ? 'Editar Anúncio' : 'Criar anúncio'}
        backToHomeButton
      />

      <VStack px={'24px'}>
        <Heading
          fontFamily={'heading'}
          color={'gray.200'}
          fontSize={'16px'}
          mt={'24px'}
        >
          Imagens
        </Heading>
        <Text
          fontFamily={'body'}
          color={'gray.300'}
          fontSize={'14px'}
          mt={'4px'}
          mb={'16px'}
        >
          Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
        </Text>

        <HStack>
          <AdImageSelector />
        </HStack>

        <Heading
          fontFamily={'heading'}
          color={'gray.200'}
          fontSize={'16px'}
          mt={'32px'}
        >
          Sobre o produto
        </Heading>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              w={'full'}
              placeholder="Título do anúncio"
              inputMode="text"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextArea
              mt={'16px'}
              px={'16px'}
              py={'12px'}
              w={'full'}
              fontFamily={'body'}
              fontSize={'16px'}
              color={'gray.200'}
              placeholder="Descrição do produto"
              backgroundColor={'gray.700'}
              borderRadius={'6px'}
              borderWidth={'0'}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.description?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="is_new"
          // defaultValue={defaulFormValues.is_new.toString()}
          render={({ field: { onChange, value } }) => (
            <Radio.Group
              name="is_new"
              // defaultValue={value.toString()}
              value={value}
              accessibilityLabel="Define the state of the product"
              onChange={(val) => onChange(val)}
            >
              <HStack space={'15px'} mt={'16px'}>
                <Radio value="true" size={'sm'}>
                  Produto novo
                </Radio>

                <Radio value="false" size={'sm'}>
                  Produto usado
                </Radio>
              </HStack>
            </Radio.Group>
          )}
        />

        <Heading
          fontFamily={'heading'}
          color={'gray.200'}
          fontSize={'16px'}
          mt={'33.5px'}
        >
          Venda
        </Heading>

        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <Input
              onChangeText={onChange}
              inputMode="numeric"
              value={value}
              errorMessage={errors.price?.message}
              leftElement={
                <Text
                  fontFamily={'body'}
                  color={'gray.100'}
                  fontSize={'16px'}
                  ml={'16px'}
                >
                  R$
                </Text>
              }
              placeholder="Valor do produto"
            />
          )}
        />

        <Heading
          fontFamily={'heading'}
          color={'gray.200'}
          fontSize={'14px'}
          mt={'16px'}
        >
          Aceita troca?
        </Heading>

        <Controller
          control={control}
          name="accept_trade"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <Switch
              alignSelf={'flex-start'}
              size={'lg'}
              onTrackColor={'blue.700'}
              onToggle={(val: boolean) => onChange(val)}
              isChecked={value}
            />
          )}
        />

        <Heading
          fontFamily={'heading'}
          color={'gray.200'}
          fontSize={'14px'}
          mb={'12px'}
        >
          Meios de pagamentos aceitos
        </Heading>

        <Controller
          control={control}
          name="paymant_methods"
          render={() => (
            <VStack space={'8px'}>
              <CheckBox
                title="Boleto"
                value="boleto"
                setValue={setValue}
                getValues={getValues}
                watchFormData={WatchformData}
              />
              <CheckBox
                title="Pix"
                value="pix"
                setValue={setValue}
                getValues={getValues}
                watchFormData={WatchformData}
              />
              <CheckBox
                title="Dinheiro"
                value="cash"
                setValue={setValue}
                getValues={getValues}
                watchFormData={WatchformData}
              />
              <CheckBox
                title="Cartão de Crédito"
                value="card"
                setValue={setValue}
                getValues={getValues}
                watchFormData={WatchformData}
              />
              <CheckBox
                title="Depósito"
                value="deposit"
                setValue={setValue}
                getValues={getValues}
                watchFormData={WatchformData}
              />
            </VStack>
          )}
        />
        {/* <VStack space={'8px'}>
          {paymantMethodsOptions.map((payment) => (
            <Controller
              key={payment.value}
              control={control}
              name={`paymant_methods2.${payment.value}`}
              render={({ field: { onChange, value } }) => (
                <CheckBox2
                  title={payment.title}
                  value={value}
                  onChangeCheckbox={onChange}
                />
              )}
            />
          ))}
        </VStack> */}

        {errors.paymant_methods?.message ? (
          <Text mt={'10px'} color={'red.500'}>
            {errors.paymant_methods.message}
          </Text>
        ) : (
          <></>
        )}
      </VStack>
      {!isEditingAd ? (
        <BottomMenu
          buttonTitle1="Cancelar"
          varianButton1="gray-light"
          buttonFunction1={handleCancelForm}
          buttonTitle2="Avançar"
          varianButton2="gray-dark"
          buttonFunction2={handleSubmit(handlePreAd)}
          isLoading2={isLoading}
          mt={'26.5px'}
        />
      ) : (
        <BottomMenu
          buttonTitle1="Cancelar"
          varianButton1="gray-light"
          buttonFunction1={handleCancelForm}
          buttonTitle2="Editar"
          varianButton2="gray-dark"
          buttonFunction2={handleSubmit(handleEditAd)}
          isLoading2={isLoading}
          mt={'26.5px'}
        />
      )}
    </ScrollView>
  )
}
