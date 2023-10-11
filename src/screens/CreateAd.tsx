/* eslint-disable camelcase */
import {
  Checkbox,
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

import { useState, useEffect, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

import { TextArea } from '../components/TextArea'
import { AppError } from '../utils/AppErros'
import {
  AppNavigatorRoutesProps,
  createAdRouteParameters,
} from '../routes/app.routes'
import { paymantMethodsDTO } from '../dtos/paymantMethodsDTO'
import { useProducts } from '../hooks/useProducts'

type FormDataProps = {
  name: string
  description: string
  is_new: string
  price: number
  accept_trade: boolean
  paymant_methods: paymantMethodsDTO[]
}

export function CreateAd() {
  const [isLoading, setIsLoading] = useState(false)
  const [checkBoxPaymantMethodsValues, setCheckBoxPaymantMethodsValues] =
    useState<paymantMethodsDTO[]>([])

  const route = useRoute()

  const { isEditingAd = false } = route.params as createAdRouteParameters

  const { createAdImage, editAdData, setEditAdData } = useProducts()

  const toast = useToast()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const signUpSchema = yup
    .object({
      name: yup.string().required('Informe o título do produto'),
      description: yup.string().required('Informe a descrição do produto'),
      is_new: yup.boolean().required('Informe o estado do produto'),
      price: yup.number().required('Informe preço do produto'),
      accept_trade: yup.boolean().required('Informe se o anúncio aceita troca'),
      paymant_methods: yup
        .array()
        .min(1, 'Selecione ao menos um método de pagamento')
        .required('Informe os métodos de pagamento'),
    })
    .required()

  const defaulFormValues = {
    name: editAdData.name ? editAdData.name : null,
    description: editAdData.description ? editAdData.description : null,
    is_new:
      editAdData.is_new === undefined ? 'true' : editAdData.is_new.toString(),
    price: editAdData.price ? editAdData.price.toString() : null,
    accept_trade:
      editAdData.accept_trade === undefined ? null : editAdData.accept_trade,
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues: defaulFormValues,
  })

  function handlePreAd({
    name,
    description,
    is_new,
    price,
    accept_trade,
    paymant_methods,
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
        setCheckBoxPaymantMethodsValues,
        resetForm: reset,
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

  function handleCancelForm() {
    setCheckBoxPaymantMethodsValues([])
    setEditAdData({})
    reset(defaulFormValues)
    navigation.goBack()
  }

  useEffect(() => {
    reset(defaulFormValues)
    setCheckBoxPaymantMethodsValues([])
  }, [editAdData])

  useFocusEffect(
    useCallback(() => {
      if (editAdData.payment_methods) {
        setCheckBoxPaymantMethodsValues(editAdData.payment_methods)
      }

      console.log(
        'checkBoxPaymantMethodsValues => ',
        checkBoxPaymantMethodsValues,
      )
    }, [editAdData]),
  )

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
          defaultValue={checkBoxPaymantMethodsValues}
          render={({ field: { onChange } }) => (
            <Checkbox.Group
              defaultValue={checkBoxPaymantMethodsValues}
              value={checkBoxPaymantMethodsValues}
              onChange={(values) => {
                setCheckBoxPaymantMethodsValues(values || [])
                onChange(values)
              }}
            >
              <Checkbox
                value="boleto"
                fontFamily={'heading'}
                color={'gray.200'}
                mb={'8px'}
                fontSize={'16px'}
                _checked={{
                  backgroundColor: 'blue.700',
                  borderColor: 'blue.700',
                }}
              >
                Boleto
              </Checkbox>
              <Checkbox
                value="pix"
                mb={'8px'}
                _checked={{
                  backgroundColor: 'blue.700',
                  borderColor: 'blue.700',
                }}
              >
                Pix
              </Checkbox>
              <Checkbox
                value="cash"
                mb={'8px'}
                _checked={{
                  backgroundColor: 'blue.700',
                  borderColor: 'blue.700',
                }}
              >
                Dinheiro
              </Checkbox>
              <Checkbox
                value="card"
                mb={'8px'}
                _checked={{
                  backgroundColor: 'blue.700',
                  borderColor: 'blue.700',
                }}
              >
                Cartão de crédito
              </Checkbox>
              <Checkbox
                value="deposit"
                _checked={{
                  backgroundColor: 'blue.700',
                  borderColor: 'blue.700',
                }}
              >
                Depósito bancário
              </Checkbox>
            </Checkbox.Group>
          )}
        />

        {errors.paymant_methods?.message ? (
          <Text mt={'10px'} color={'red.500'}>
            {errors.paymant_methods?.message}
          </Text>
        ) : (
          <></>
        )}
      </VStack>
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
    </ScrollView>
  )
}
