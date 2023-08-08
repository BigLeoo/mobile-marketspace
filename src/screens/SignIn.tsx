import { useNavigation } from '@react-navigation/native'
import { Box, Center, HStack, ScrollView, Text, VStack } from 'native-base'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'
import { Input } from '../components/input'

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleSignUp() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView>
      <VStack>
        <Center>
          <Text fontFamily={'heading'} fontSize={'xl'}>
            signUp
          </Text>
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" />
        </Center>
      </VStack>
    </ScrollView>
  )
}
