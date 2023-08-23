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
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'
import { AppError } from '../utils/AppErros'

type FormDataProps = {
  avatar: string
  name: string
  email: string
  phone: number
  password: string
  confirm_password: string
}

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState()

  const toast = useToast()

  const { user } = useAuth()

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const signUpSchema = yup
    .object({
      // avatar: yup.string().required('Selecione a foto'),
      name: yup.string().required('Informe o nome'),
      email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
      phone: yup
        .number()
        .required('Informe o número de telefone')
        .min(7, 'Informe o número de telefone correto.'),
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

  async function handleSingUp({
    avatar = userPhoto.uri,
    name,
    email,
    phone,
    password,
    confirm_password,
  }: FormDataProps) {
    console.log({ avatar, name, email, phone, password, confirm_password })
    try {
      setIsLoading(true)

      await api.post('/users', { avatar, email, phone, password })

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
      console.log(error)
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
    if (!photoSelected.canceled) {
      setUserPhoto(photoSelected.assets[0].uri)
    }

    const fileExtension = photoSelected.assets[0].uri.split('.').pop()

    const photoFile = {
      name: `${user.name}.${fileExtension}`.toLowerCase(),
      uri: photoSelected.assets[0].uri,
      type: `${photoSelected.assets[0].type}/${fileExtension}`,
    } as any

    const userPhotoUploadForm = new FormData()
    userPhotoUploadForm.append('avatar', photoFile)

    setUserPhoto(photoFile)

    console.log(userPhoto)
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

          {/* <Controller
            control={control}
            name="avatar"
            render={() => (
              <TouchableOpacity onPress={handleUserPhotoSelect}>
                <Avatar
                  mt={8}
                  variant="edit"
                  imageSize={22}
                  errorMessage={errors.avatar?.message}
                />
              </TouchableOpacity>
            )}
          /> */}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Avatar mt={8} variant="edit" imageSize={22} />
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
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                onChangeText={onChange}
                keyboardType="numeric"
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
