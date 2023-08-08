import { Box, Center } from 'native-base'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'
import { useNavigation } from '@react-navigation/native'

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleSignIn() {
    navigation.navigate('signIn')
  }

  return (
    <Center>
      <Box>Signup</Box>
    </Center>
  )
}
