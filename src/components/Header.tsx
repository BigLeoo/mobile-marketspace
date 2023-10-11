import { useNavigation } from '@react-navigation/native'
import { Center, Heading, View, useTheme } from 'native-base'
import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types'
import { ArrowLeft, PencilSimpleLine, Plus } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { useProducts } from '../hooks/useProducts'
import { paymantMethodsDTO } from '../dtos/paymantMethodsDTO'

type HeaderProps = IViewProps & {
  title?: string
  backToHomeButton?: boolean
  backToMyAdsButton?: boolean
  iconRight?: 'plus' | 'pencil'
  setCheckBoxPaymantMethodsValues?: paymantMethodsDTO[]
}

export function Header({
  title,
  backToHomeButton,
  backToMyAdsButton,
  iconRight,
}: HeaderProps) {
  const { colors } = useTheme()

  const { setEditAdData } = useProducts()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBackToHome() {
    setEditAdData({})
    navigation.goBack()
  }

  function handleGoBackToMyAds() {
    setEditAdData({})
    navigation.navigate('myAds')
  }

  function handleEditAd() {
    navigation.navigate('createAd', { isEditingAd: true })
  }

  function handleCreateAd() {
    navigation.navigate('createAd', { isEditingAd: false })
  }

  return (
    <View px={6} pt={5} pb={2} position={'relative'} alignItems={'center'}>
      {backToMyAdsButton ? (
        <TouchableOpacity onPress={handleGoBackToMyAds}>
          <View position={'absolute'} right={'145px'} top={'0px'}>
            <ArrowLeft size={24} weight="bold" />
          </View>
        </TouchableOpacity>
      ) : backToHomeButton ? (
        <TouchableOpacity onPress={handleGoBackToHome}>
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
        <TouchableOpacity onPress={handleCreateAd}>
          <View position={'absolute'} bottom={'0px'} left={'145px'}>
            <Plus size={24} weight="bold" color={colors.gray[100]} />
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}

      {iconRight === 'pencil' ? (
        <TouchableOpacity onPress={handleEditAd}>
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
