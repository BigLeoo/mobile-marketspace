/* eslint-disable camelcase */
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { MyAds } from '../screens/MyAds'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { House, Tag, SignOut as SignOutIcon } from 'phosphor-react-native'

import { useTheme } from 'native-base'
import { SignOut } from '../screens/SignOut'
import { AdDetail } from '../screens/AdDetail'
import { CreateAd } from '../screens/CreateAd'
import { paymantMethodsDTO } from '../dtos/paymantMethodsDTO'

type productImages = {
  id: string
  path: string
}

type userAdDetail = {
  avatar: string
  name: string
  tel: string
}

export type adDetailProp = {
  active: boolean
  preAd: boolean
  userEditAd?: boolean
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  paymant_methods: paymantMethodsDTO[]
  setGroupValue?: React.Dispatch<React.SetStateAction<string[]>>
  product_images?: productImages[]
  userAdDetail?: userAdDetail
  id?: string
  resetForm?: () => void
}

export type createAdRouteParameters = {
  isEditingAd: boolean
}

type AppRoutes = {
  home: undefined
  myAds: undefined
  logOut: undefined
  adDetail: adDetailProp
  createAd: createAdRouteParameters
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: colors.gray[700],
          paddingTop: sizes[5],
          paddingBottom: sizes[7],
          alignItems: 'center',
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House size={24} weight="bold" color={color} />
          ),
        }}
      />

      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => (
            <Tag size={24} weight="bold" color={color} />
          ),
        }}
      />

      <Screen
        name="logOut"
        component={SignOut}
        options={{
          tabBarIcon: () => <SignOutIcon size={24} color={colors.red[600]} />,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="adDetail"
        component={AdDetail}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="createAd"
        component={CreateAd}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Navigator>
  )
}
