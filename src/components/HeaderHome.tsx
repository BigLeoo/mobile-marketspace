import { HStack, Heading, Text, VStack } from 'native-base'

import { Avatar } from './Avatar'
import { Button } from './Button'

import { Plus } from 'phosphor-react-native'
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'

type headerHomeProps = IHStackProps

export function HeaderHome({ ...rest }: headerHomeProps) {
  return (
    <HStack justifyContent={'space-between'} width={80} {...rest}>
      <HStack>
        <Avatar imageSize={45} avatarImage={'https://github.com/BigLeoo.png'} />

        <VStack ml={2}>
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
        variant={'gray-dark'}
        buttonSize={30}
        leftIcon={<Plus size={16} color="#EDECEE" />}
      />
    </HStack>
  )
}
