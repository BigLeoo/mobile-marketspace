/* eslint-disable camelcase */
import {
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { TouchableOpacity } from 'react-native'

import { AuthNavigatorRoutesProps } from '../routes/auth.routes'
import { useNavigation } from '@react-navigation/native'

import * as ImagePicker from 'expo-image-picker'

import LogoSvg from '../../assets/Logo.svg'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Avatar } from '../components/Avatar'

import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

import { api } from '../services/api'
import { AppError } from '../utils/AppErros'

type FormDataProps = {
  name: string
  email: string
  tel: string
  password: string
  confirm_password: string
}

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState()

  const toast = useToast()

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const phoneRegExp = /^(?:[0-9] ?){6,14}[0-9]$/

  const signUpSchema = yup
    .object({
      name: yup.string().required('Informe o nome'),
      email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
      tel: yup
        .string()
        .required('Informe o número de telefone')
        .matches(phoneRegExp, 'Caracteres inválidos'),
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

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSingUp({ name, email, tel, password }: FormDataProps) {
    try {
      setIsLoading(true)

      if (!userPhoto) {
        toast.show({
          title: 'Porfavor envie uma imagem.',
          placement: 'top',
          bgColor: 'red.500',
        })

        return
      }

      const fileExtension = userPhoto.assets[0].uri.split('.').pop()

      const photoFile = {
        name: `${name}.${fileExtension}`.toLowerCase(),
        uri: userPhoto.assets[0].uri,
        type: `${userPhoto.assets[0].type}/${fileExtension}`,
      }

      const userForm = new FormData()

      userForm.append('avatar', photoFile)
      userForm.append('name', name)
      userForm.append('email', email)
      userForm.append('tel', tel.toString())
      userForm.append('password', password)

      await api.post('/users', userForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      handleGoBack()

      toast.show({
        title: 'Usuário criado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta, tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUserPhotoSelect() {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    })

    if (photoSelected.canceled) {
      return
    }

    setUserPhoto(photoSelected)
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

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Avatar
              mt={8}
              variant="edit"
              imageSize={22}
              avatarImage={userPhoto?.assets[0].uri}
            />
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                textContentType="name"
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
                textContentType="emailAddress"
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="tel"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                onChangeText={onChange}
                keyboardType="numeric"
                value={value}
                errorMessage={errors.tel?.message}
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
                onSubmitEditing={handleSubmit(handleSingUp)}
              />
            )}
          />

          <Button
            title="Criar"
            variant={'gray-dark'}
            mt={6}
            isLoading={isLoading}
            onPress={handleSubmit(handleSingUp)}
          />

          <Text mt={12} fontFamily={'body'} fontSize={'sm'} color={'gray.200'}>
            Já tem uma conta?
          </Text>

          <Button
            title="Ir para o login"
            variant={'gray-light'}
            mt={4}
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
