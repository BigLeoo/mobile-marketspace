import { Center, HStack, ICenterProps } from 'native-base'
import { Button } from './Button'

type BottomMenuProps = ICenterProps & {
  buttonTitle1: string
  varianButton1: 'gray-light' | 'gray-dark' | 'blue-light'
  leftIcon1?: JSX.Element
  buttonFunction1?: () => void
  buttonTitle2: string
  varianButton2: 'gray-light' | 'gray-dark' | 'blue-light'
  leftIcon2?: JSX.Element
  buttonFunction2?: () => void
}

export function BottomMenu({
  buttonTitle1,
  varianButton1,
  leftIcon1,
  buttonFunction1,
  buttonTitle2,
  varianButton2,
  leftIcon2,
  buttonFunction2,
  ...rest
}: BottomMenuProps) {
  return (
    <Center background={'gray.700'} pt={'20px'} pb={'28px'} {...rest}>
      <HStack space={'12px'}>
        <Button
          variant={varianButton1}
          title={buttonTitle1}
          leftIcon={leftIcon1 || <></>}
          buttonSize={'157.5px'}
          onPress={buttonFunction1}
        />
        <Button
          variant={varianButton2}
          title={buttonTitle2}
          leftIcon={leftIcon2 || <></>}
          buttonSize={'157.5px'}
          onPress={buttonFunction2}
        />
      </HStack>
    </Center>
  )
}
