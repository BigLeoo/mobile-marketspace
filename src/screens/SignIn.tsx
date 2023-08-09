import { useNavigation } from '@react-navigation/native'
import { Center, Pressable, ScrollView, Stack, Text, VStack } from 'native-base'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

import LogoSvg from '../../assets/Group 1.svg'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Eye, EyeSlash } from 'phosphor-react-native'

import { useState } from 'react'

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const [visibility, setVisibility] = useState(false)

  function handleSignUp() {
    navigation.navigate('signUp')
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
          <Input placeholder="E-mail" variant={'shadow'} />

          <Stack alignItems={'center'} space={4} w={'100%'}>
            <Input
              placeholder="Senha"
              type={visibility ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setVisibility(!visibility)} mr={4}>
                  {visibility ? <Eye size={20} /> : <EyeSlash size={20} />}
                </Pressable>
              }
            />
          </Stack>

          <Button title="Entrar" variant={'blue-light'} mt={4} />
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
