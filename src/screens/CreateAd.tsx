import {
  Checkbox,
  HStack,
  Heading,
  Radio,
  ScrollView,
  Switch,
  Text,
  TextArea,
  VStack,
} from 'native-base'

import { Header } from '../components/Header'
import { CreateAdImage } from '../components/CreateAdImage'
import { Input } from '../components/Input'
import { BottomMenu } from '../components/BottomMenu'

export function CreateAd() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header title="Criar anúncio" backButton />

      <VStack px={'24px'}>
        <Heading
          fontFamily={'heading'}
          color={'gray.200'}
          fontSize={'16px'}
          mt={'24px'}
        >
          Imagens
        </Heading>
        <Text
          fontFamily={'body'}
          color={'gray.300'}
          fontSize={'14px'}
          mt={'4px'}
          mb={'16px'}
        >
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>

        <HStack>
          <CreateAdImage />
        </HStack>

        <Heading
          fontFamily={'heading'}
          color={'gray.200'}
          fontSize={'16px'}
          mt={'32px'}
        >
          Sobre o produto
        </Heading>

        <Input w={'full'} placeholder="Título do anúncio" inputMode="numeric" />

        <TextArea
          mt={'16px'}
          w={'full'}
          placeholder="Descrição do produto"
          autoCompleteType={false}
          fontFamily={'body'}
          color={'gray.200'}
          fontSize={'16px'}
          backgroundColor={'gray.700'}
          py={'12px'}
          px={'16px'}
          borderRadius={'6px'}
          borderWidth={'0'}
          mb={'16px'}
        />

        <Radio.Group
          name="ProductState"
          accessibilityLabel="Define the state of the product"
          defaultValue="new"
        >
          <HStack space={'15px'}>
            <Radio value="new" size={'sm'}>
              Produto novo
            </Radio>

            <Radio value="used" size={'sm'}>
              Produto usado
            </Radio>
          </HStack>
        </Radio.Group>

        <Heading
          fontFamily={'heading'}
          color={'gray.200'}
          fontSize={'16px'}
          mt={'33.5px'}
        >
          Venda
        </Heading>

        <Input
          leftElement={
            <Text
              fontFamily={'body'}
              color={'gray.100'}
              fontSize={'16px'}
              ml={'16px'}
            >
              R$
            </Text>
          }
          placeholder="Valor do produto"
        />

        <Heading
          fontFamily={'heading'}
          color={'gray.200'}
          fontSize={'14px'}
          mt={'16px'}
        >
          Aceita troca?
        </Heading>

        <Switch
          alignSelf={'flex-start'}
          size={'lg'}
          onTrackColor={'blue.700'}
        />

        <Heading
          fontFamily={'heading'}
          color={'gray.200'}
          fontSize={'14px'}
          mb={'12px'}
        >
          Meios de pagamentos aceitos
        </Heading>

        <Checkbox
          value="ticket"
          fontFamily={'heading'}
          color={'gray.200'}
          mb={'8px'}
          fontSize={'16px'}
          _checked={{
            backgroundColor: 'blue.700',
            borderColor: 'blue.700',
          }}
        >
          Boleto
        </Checkbox>
        <Checkbox
          value="pix"
          mb={'8px'}
          _checked={{
            backgroundColor: 'blue.700',
            borderColor: 'blue.700',
          }}
        >
          Pix
        </Checkbox>
        <Checkbox
          value="cash"
          mb={'8px'}
          _checked={{
            backgroundColor: 'blue.700',
            borderColor: 'blue.700',
          }}
        >
          Dinheiro
        </Checkbox>
        <Checkbox
          value="creditCard"
          mb={'8px'}
          _checked={{
            backgroundColor: 'blue.700',
            borderColor: 'blue.700',
          }}
        >
          Cartão de crédito
        </Checkbox>
        <Checkbox
          value="deposit"
          _checked={{
            backgroundColor: 'blue.700',
            borderColor: 'blue.700',
          }}
        >
          Depósito bancário
        </Checkbox>
      </VStack>
      <BottomMenu
        buttonTitle1="Cancelar"
        varianButton1="gray-light"
        buttonTitle2="Avançar"
        varianButton2="gray-dark"
        mt={'26.5px'}
      />
    </ScrollView>
  )
}
