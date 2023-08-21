import { HStack, Heading, Text, VStack } from 'native-base'

import { Avatar } from './Avatar'
import { Button } from './Button'

import { Plus } from 'phosphor-react-native'
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

type headerHomeProps = IHStackProps

export function HeaderHome({ ...rest }: headerHomeProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleCreateAd() {
    navigation.navigate('createAd')
  }

  return (
    <HStack justifyContent={'space-between'} {...rest}>
      <HStack>
        <Avatar imageSize={46} avatarImage={'https://github.com/BigLeoo.png'} />

        <VStack ml={3}>
          <Text fontFamily={'body'} fontSize={'md'} color={'gray.100'}>
            Boas vindas,
          </Text>
          <Heading fontFamily={'heading'} fontSize={'md'} color={'gray.100'}>
            Leonardo !
          </Heading>
        </VStack>
      </HStack>

      <Button
        title="Criar anúncio"
        onPress={handleCreateAd}
        variant={'gray-dark'}
        buttonSize={30}
        leftIcon={<Plus size={16} color="#EDECEE" />}
      />
    </HStack>
  )
}
