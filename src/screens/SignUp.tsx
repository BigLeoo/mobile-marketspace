/* eslint-disable camelcase */
import { Center, Heading, ScrollView, Text, VStack } from 'native-base'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'
import { useNavigation } from '@react-navigation/native'

import LogoSvg from '../../assets/Logo.svg'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Avatar } from '../components/Avatar'

import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type FormDataProps = {
  name: string
  email: string
  phone: number
  password: string
  confirm_password: string
}

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const signUpSchema = yup
    .object({
      name: yup.string().required('Informe o nome'),
      email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
      phone: yup.number().required('Informe o número de telefone'),
      password: yup
        .string()
        .min(6, 'A senha deve ter 6 caracteres no mínimo.')
        .nullable()
        .transform((value) => value || null)
        .required('Informe a senha.'),
      confirm_password: yup
        .string()
        .nullable()
        .transform((value) => value || null)
        .oneOf(
          [yup.ref('password'), null],
          'A confirmação da senha não confere.',
        )
        .when('password', {
          is: (Field: any) => Field,
          then: (schema) =>
            schema
              .nullable()
              .required('Informe a confirmação da senha')
              .transform((value) => value || null),
        }),
    })
    .required()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) })

  function handleSignIn() {
    navigation.navigate('signIn')
  }

  function handleSingUp({
    name,
    email,
    phone,
    password,
    confirm_password,
  }: FormDataProps) {
    console.log({ name, email, phone, password, confirm_password })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack>
        <Center px={12} pt={12} pb={12}>
          <LogoSvg />

          <Heading
            fontFamily={'heading'}
            fontSize={'lg'}
            color={'gray.100'}
            mt={3}
          >
            Boas Vindas!
          </Heading>

          <Text
            noOfLines={2}
            textAlign={'center'}
            fontSize={'sm'}
            fontFamily={'body'}
            color={'gray.200'}
            mt={2}
          >
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>

          <Avatar mt={8} variant="edit" imageSize={22} />

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                inputType="password"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar senha"
                inputType="password"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Criar"
            variant={'gray-dark'}
            mt={6}
            onPress={handleSubmit(handleSingUp)}
          />

          <Text mt={12} fontFamily={'body'} fontSize={'sm'} color={'gray.200'}>
            Já tem uma conta?
          </Text>

          <Button
            title="Ir para o login"
            variant={'gray-light'}
            mt={4}
            onPress={handleSubmit(handleSingUp)}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
