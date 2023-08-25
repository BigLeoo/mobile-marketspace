import { useNavigation } from '@react-navigation/native'
import { Center, ScrollView, Text, VStack, useToast } from 'native-base'
import { useState } from 'react'

import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

import LogoSvg from '../../assets/Group 1.svg'

import { Button } from '../components/Button'
import { Input } from '../components/Input'

import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { api } from '../services/api'
import { AppError } from '../utils/AppErros'

type FormDataProps = {
  email: string
  password: string
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const signUpSchema = yup
    .object({
      email: yup.string().required('Informe o e-mail').email('E-mail inválido'),

      password: yup
        .string()
        .min(6, 'A senha deve ter 6 caracteres no mínimo.')
        .required('Informe a senha.'),
    })
    .required()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) })

  function handleSignUp() {
    navigation.navigate('signUp')
  }

  async function handleSingIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)

      const response = await api.post('/sessions', { email, password })

      console.log(response.headers)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível realizar o login, tente novamente mais tarde.'

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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16} bg={'gray.600'}>
        <Center mt={16}>
          <LogoSvg />
        </Center>

        <Center mt={20}>
          <Text fontFamily={'body'} fontSize={'sm'} color={'gray.200'}>
            Acesse a sua conta
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                variant={'shadow'}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
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
                onSubmitEditing={handleSubmit(handleSingIn)}
              />
            )}
          />

          <Button
            title="Entrar"
            variant={'blue-light'}
            mt={4}
            onPress={handleSubmit(handleSingIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={32}>
          <Text fontSize={'sm'} fontFamily={'body'}>
            Ainda não tem acesso?
          </Text>

          <Button
            mt={4}
            title="Criar uma conta"
            variant={'gray-light'}
            onPress={handleSignUp}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
