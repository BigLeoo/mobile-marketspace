import { HStack, Select, Text, VStack } from 'native-base'
import { Header } from '../components/Header'

export function MyAds() {
  return (
    <VStack>
      <Header title="Meus anúncios" iconRight="plus" />

      <VStack>
        <HStack justifyContent={'space-between'}>
          <Text>9 anúncios</Text>
          <Select />
        </HStack>
      </VStack>
    </VStack>
  )
}
