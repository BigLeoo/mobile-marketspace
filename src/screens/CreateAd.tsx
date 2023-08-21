import { HStack, Heading, ScrollView, Text, VStack } from 'native-base'
import { Header } from '../components/Header'
import { CreateAdImage } from '../components/CreateAdImage'

export function CreateAd() {
  return (
    <ScrollView>
      <Header title="Criar anúncio" backButton />

      <VStack px={'24px'}>
        <Heading>Imagens</Heading>
        <Text>
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>

        <HStack>
          <CreateAdImage />
        </HStack>
      </VStack>
    </ScrollView>
  )
}
