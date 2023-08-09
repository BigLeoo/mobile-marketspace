import { Center, Heading, ScrollView, Text, VStack } from 'native-base'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'
import { useNavigation } from '@react-navigation/native'

import LogoSvg from '../../assets/Logo.svg'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Avatar } from '../components/Avatar'

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleSignIn() {
    navigation.navigate('signIn')
  }

  return (
    <ScrollView>
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

          <Avatar mt={8} />

          <Input placeholder="Nome" />

          <Input placeholder="E-mail" />

          <Input placeholder="Telefone" />

          <Input placeholder="Senha" />

          <Input placeholder="Confirmar senha" />

          <Button title="Criar" variant={'gray-dark'} mt={6} />

          <Text mt={12} fontFamily={'body'} fontSize={'sm'} color={'gray.200'}>
            Já tem uma conta?
          </Text>

          <Button
            title="Ir para o login"
            variant={'gray-light'}
            mt={4}
            onPress={handleSignIn}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
