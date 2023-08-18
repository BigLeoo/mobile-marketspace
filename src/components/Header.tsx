import { useNavigation } from '@react-navigation/native'
import { Center, Heading, View, useTheme } from 'native-base'
import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types'
import { ArrowLeft, PencilSimpleLine, Plus } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

type HeaderProps = IViewProps & {
  title?: string
  backButton?: boolean
  iconRight?: 'plus' | 'pencil'
}

export function Header({ title, backButton, iconRight }: HeaderProps) {
  const { colors } = useTheme()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <View px={6} pt={5} pb={2} position={'relative'} alignItems={'center'}>
      {backButton ? (
        <TouchableOpacity onPress={handleGoBack}>
          <View position={'absolute'} right={'145px'} top={'0px'}>
            <ArrowLeft size={24} weight="bold" />
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}

      {title ? (
        <Center>
          <Heading fontFamily={'heading'} color={'gray.100'} fontSize={'lg'}>
            {title}
          </Heading>
        </Center>
      ) : (
        <Center>
          <Heading></Heading>
        </Center>
      )}

      {iconRight === 'plus' ? (
        <TouchableOpacity>
          <View position={'absolute'} bottom={'0px'} left={'145px'}>
            <Plus size={24} weight="bold" color={colors.gray[100]} />
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}

      {iconRight === 'pencil' ? (
        <TouchableOpacity>
          <View position={'absolute'} bottom={'0px'} left={'145px'}>
            <PencilSimpleLine
              size={24}
              weight="bold"
              color={colors.gray[100]}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  )
}
