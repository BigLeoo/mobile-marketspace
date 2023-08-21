import {
  Checkbox,
  HStack,
  Heading,
  ScrollView,
  Switch,
  Text,
  TextArea,
  VStack,
} from 'native-base'
import { Header } from '../components/Header'
import { CreateAdImage } from '../components/CreateAdImage'
import { Input } from '../components/Input'

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

        <Heading>Sobre o produto</Heading>

        <Input w={'full'} placeholder="Título do anúncio" />

        <TextArea w={'full'} placeholder="Descrição do produto" />

        <HStack>
          <Checkbox>Produto novo</Checkbox>
          <Checkbox>Produto usado</Checkbox>
        </HStack>

        <Heading>Venda</Heading>

        <Input leftElement={<Text>R$</Text>} placeholder="Valor do produto" />

        <Heading>Aceita troca?</Heading>

        <Switch
          alignSelf={'flex-start'}
          size={'lg'}
          onTrackColor={'blue.700'}
        />

        <Heading>Meios de pagamentos aceitos</Heading>

        <Checkbox>Boleto</Checkbox>
        <Checkbox>Pix</Checkbox>
        <Checkbox>Dinheiro</Checkbox>
        <Checkbox>Cartão de crédito</Checkbox>
        <Checkbox>Depósito bancário</Checkbox>
      </VStack>
    </ScrollView>
  )
}
