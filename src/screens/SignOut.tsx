import {
  Box,
  Center,
  HStack,
  Heading,
  Spinner,
  VStack,
  View,
  useTheme,
} from 'native-base'
import { useAuth } from '../hooks/useAuth'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

import LogoSvg from '../../assets/Group 1.svg'

export function SignOut() {
  const { signOut } = useAuth()

  const { colors } = useTheme()

  useFocusEffect(
    useCallback(() => {
      signOut()
    }, []),
  )

  return (
    <Box>
      <Center h={'full'}>
        <LogoSvg />

        <HStack alignItems={'center'}>
          <Spinner
            size={'lg'}
            color={colors.blue[700]}
            mt={'50px'}
            alignSelf={'center'}
          />
        </HStack>
      </Center>
    </Box>
  )
}
