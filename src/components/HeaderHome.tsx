import { HStack, Heading, Text, VStack } from 'native-base'

import { Avatar } from './Avatar'
import { Button } from './Button'

import { Plus } from 'phosphor-react-native'
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { api } from '../services/api'
import { useProducts } from '../hooks/useProducts'

type headerHomeProps = IHStackProps & {
  userName: string
  userAvatar: string
}

export function HeaderHome({ userName, userAvatar, ...rest }: headerHomeProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { setCreateAdImage } = useProducts()

  function handleCreateAd() {
    setCreateAdImage([])

    navigation.navigate('createAd', { isEditingAd: false })
  }

  return (
    <HStack justifyContent={'space-between'} {...rest}>
      <HStack>
        <Avatar
          imageSize={46}
          avatarImage={`${api.defaults.baseURL}/images/${userAvatar}`}
        />

        <VStack ml={3}>
          <Text fontFamily={'body'} fontSize={'md'} color={'gray.100'}>
            Boas vindas,
          </Text>
          <Heading fontFamily={'heading'} fontSize={'md'} color={'gray.100'}>
            {userName} !
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
