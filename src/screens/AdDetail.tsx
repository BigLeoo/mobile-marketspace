import {
  HStack,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  View,
  useTheme,
} from 'native-base'
import ProductImage from '../../assets/shoes.png'

import { Header } from '../components/Header'
import { Avatar } from '../components/Avatar'
import { TagComponent } from '../components/TagComponent'
import { PaymantChose } from '../components/PaymantChose'
import { Button } from '../components/Button'

import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  Power,
  QrCode,
  TrashSimple,
  WhatsappLogo,
  Tag,
} from 'phosphor-react-native'
import { HeaderPreAd } from '../components/HeaderPreAd'
import { BottomMenu } from '../components/BottomMenu'

type AdDetailProps = {
  active: boolean
  preAd: boolean
}

export function AdDetail({ active = true, preAd = false }: AdDetailProps) {
  const { colors } = useTheme()

  return (
    <ScrollView bg={'gray.600'}>
      {!preAd ? <Header backButton /> : <HeaderPreAd />}

      <Image
        source={ProductImage}
        height={72}
        width={'full'}
        alt="Product Image"
      />

      <VStack px={6}>
        <HStack mt={5} space={2}>
          <Avatar
            variant="normal"
            imageSize={'24px'}
            avatarImage={'https://github.com/BigLeoo.png'}
          />
          <Text color={'gray.100'} fontSize={'sm'} fontFamily={'body'}>
            Leonardo Vinicius Martins Ramos
          </Text>
        </HStack>

        <TagComponent w={'60px'} title="novo" mt={6} />

        <HStack justifyContent={'space-between'} mt={'10px'}>
          <Heading color={'gray.100'} fontFamily={'heading'} fontSize={'lg'}>
            Tênis
          </Heading>
          <HStack alignItems={'baseline'} space={1}>
            <Text color={'blue.700'} fontFamily={'heading'} fontSize={'sm'}>
              R$
            </Text>
            <Text color={'blue.700'} fontFamily={'heading'} fontSize={'lg'}>
              120,00
            </Text>
          </HStack>
        </HStack>

        <Text mt={2} color={'gray.200'} fontFamily={'body'} fontSize={'sm'}>
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
          Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
          nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
          in aliquam.
        </Text>

        <HStack mt={6} alignItems={'center'} space={2}>
          <Heading color={'gray.200'} fontFamily={'heading'} fontSize={'sm'}>
            Aceita troca?
          </Heading>
          <Text color={'gray.200'} fontFamily={'body'} fontSize={'sm'}>
            Sim
          </Text>
        </HStack>

        <Heading
          mt={4}
          color={'gray.200'}
          fontFamily={'heading'}
          fontSize={'sm'}
        >
          Meios de pagamento:
        </Heading>

        <View mt={2}>
          <PaymantChose title="Boleto" leftIcon={<Barcode size={18} />} />
          <PaymantChose title="Pix" leftIcon={<QrCode size={18} />} mb={1} />
          <PaymantChose title="Dinheiro" leftIcon={<Money size={18} />} />
          <PaymantChose
            title="Cartão de Crédito"
            leftIcon={<CreditCard size={18} />}
          />
          <PaymantChose
            title="Depósito Bancário"
            leftIcon={<Bank size={18} />}
          />
        </View>
      </VStack>
      {active ? (
        <HStack
          bg={'gray.700'}
          justifyContent={'space-between'}
          mt={7}
          px={6}
          pt={5}
          pb={7}
          alignItems={'center'}
        >
          <HStack alignItems={'baseline'} space={1}>
            <Text color={'blue.700'} fontFamily={'heading'} fontSize={'sm'}>
              R$
            </Text>
            <Text color={'blue.700'} fontFamily={'heading'} fontSize={'lg'}>
              120,00
            </Text>
          </HStack>

          <Button
            variant={'blue-light'}
            title="Entrar em contato"
            leftIcon={
              <WhatsappLogo size={16} color={colors.white} weight="fill" />
            }
            buttonSize={'169px'}
          />
        </HStack>
      ) : preAd ? (
        <BottomMenu
          mt={'10px'}
          buttonTitle1="Voltar e editar"
          varianButton1="gray-light"
          leftIcon1={
            <ArrowLeft size={16} weight="bold" color={colors.gray[200]} />
          }
          buttonTitle2="Publicar"
          varianButton2="blue-light"
          leftIcon2={<Tag size={16} weight="bold" color={colors.gray[600]} />}
        />
      ) : (
        <VStack px={6} mt={'32px'} pb={'30px'} space={'8px'}>
          <Button
            title="Reativar anúncio"
            variant={'blue-light'}
            leftIcon={<Power size={16} color={colors.gray[700]} />}
          />
          <Button
            title="Excluir anúncio"
            variant={'gray-light'}
            leftIcon={<TrashSimple size={16} color={colors.gray[200]} />}
          />
        </VStack>
      )}
    </ScrollView>
  )
}
