/* eslint-disable camelcase */
import {
  Checkbox,
  HStack,
  Heading,
  Radio,
  ScrollView,
  Switch,
  Text,
  TextArea,
  VStack,
} from 'native-base'

import { Header } from '../components/Header'
import { CreateAdImage } from '../components/CreateAdImage'
import { Input } from '../components/Input'
import { BottomMenu } from '../components/BottomMenu'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { api } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'

type paymant_methods = {
  paymants: 'boleto' | 'pix' | 'cash' | 'card' | 'deposit'
}

type FormDataProps = {
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: true
  paymant_methods: paymant_methods[]
}

export function CreateAd() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  const { postProducts } = useProducts()

  const { userToken } = useAuth()

  const signUpSchema = yup
    .object({
      name: yup.string().required('Informe o título do produto'),
      description: yup.string().required('Informe a descrição do produto'),
      is_new: yup.boolean().required('Informe o estado do produto'),
      price: yup.number().required('Informe preço do produto'),
      accept_trade: yup.boolean().required('Informe se o anúncio aceita troca'),
      paymant_methods: yup
        .array()
        .min(1)
        .required('Informe os métodos de pagamento'),
    })
    .required()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) })

  async function handleCreateAdd({
    name,
    description,
    is_new,
    price,
    accept_trade,
    paymant_methods,
  }: FormDataProps) {
    console.log({
      name,
      description,
      is_new,
      price,
      accept_trade,
      paymant_methods,
    })

    // const paymantMethodsArray = [paymant_methods]
    // console.log(paymantMethodsArray)

    try {
      setIsLoading(true)

      await postProducts(
        name,
        description,
        is_new,
        price,
        accept_trade,
        paymant_methods,
      )
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleCancelForm() {
    reset()
    navigation.goBack()
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header title="Criar anúncio" backButton />

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
          <CreateAdImage />
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
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextArea
              mt={'16px'}
              w={'full'}
              placeholder="Descrição do produto"
              autoCompleteType={false}
              fontFamily={'body'}
              color={'gray.200'}
              fontSize={'16px'}
              backgroundColor={'gray.700'}
              py={'12px'}
              px={'16px'}
              borderRadius={'6px'}
              borderWidth={'0'}
              mb={'16px'}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="is_new"
          render={({ field: { onChange } }) => (
            <Radio.Group
              name="is_new"
              accessibilityLabel="Define the state of the product"
              onChange={(val) => onChange(val)}
            >
              <HStack space={'15px'}>
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
          defaultValue={[]}
          render={({ field: { onChange } }) => (
            <Checkbox.Group
              onChange={(values) => {
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
      </VStack>
      <BottomMenu
        buttonTitle1="Cancelar"
        varianButton1="gray-light"
        buttonFunction1={handleCancelForm}
        buttonTitle2="Avançar"
        varianButton2="gray-dark"
        buttonFunction2={handleSubmit(handleCreateAdd)}
        isLoading2={isLoading}
        mt={'26.5px'}
      />
    </ScrollView>
  )
}
