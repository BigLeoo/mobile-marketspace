import { HStack, Text } from 'native-base'
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'
import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'

type PaymantChoseProps = IHStackProps & {
  paymant: 'boleto' | 'pix' | 'cash' | 'card' | 'deposit'
}

export function PaymantChose({ paymant, ...rest }: PaymantChoseProps) {
  return (
    <HStack space={2} {...rest} mb={1}>
      {paymant === 'boleto' ? (
        <Barcode size={18} />
      ) : paymant === 'pix' ? (
        <QrCode size={18} />
      ) : paymant === 'cash' ? (
        <Money size={18} />
      ) : paymant === 'card' ? (
        <CreditCard size={18} />
      ) : (
        <Bank size={18} />
      )}
      <Text color={'gray.200'} fontFamily={'body'} fontSize={'sm'}>
        {paymant.charAt(0).toUpperCase() + paymant.slice(1)}
      </Text>
    </HStack>
  )
}
