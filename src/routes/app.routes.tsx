import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { MyAds } from '../screens/MyAds'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { House, Tag, SignOut as SignOutIcon } from 'phosphor-react-native'

import { useTheme } from 'native-base'
import { SignOut } from '../screens/SignOut'

type AuthRoutes = {
  home: undefined
  myAds: undefined
  logOut: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AuthRoutes>()

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
          tabBarIcon: () => (
            <House size={24} weight="bold" color={colors.gray[200]} />
          ),
        }}
      />

      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: () => <Tag size={24} color={colors.gray[400]} />,
        }}
      />

      <Screen
        name="logOut"
        component={SignOut}
        options={{
          tabBarIcon: () => <SignOutIcon size={24} color={colors.red[600]} />,
        }}
      />
    </Navigator>
  )
}
