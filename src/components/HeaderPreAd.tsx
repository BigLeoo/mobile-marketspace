import { Center, Heading, StatusBar, Text, useTheme } from 'native-base'

export function HeaderPreAd() {
  const { colors } = useTheme()

  return (
    <Center bg={'blue.700'} py={'16px'}>
      <Heading fontFamily={'heading'} color={'gray.700'} fontSize={'16px'}>
        Pré visualização do anúncio
      </Heading>
      <Text fontFamily={'body'} color={'gray.700'} fontSize={'14px'}>
        É assim que seu produto vai aparecer!
      </Text>
      <StatusBar backgroundColor={colors.blue[700]} />
    </Center>
  )
}
