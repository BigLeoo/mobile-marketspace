/* eslint-disable camelcase */
import { NativeBaseProvider, StatusBar } from 'native-base'

import { THEME } from './src/theme'
import { Routes } from './src/routes'
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'
import { ActivityIndicator } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#EDECEE' }}>
        <NativeBaseProvider theme={THEME}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
            translucent={true}
          />
          {fontsLoaded ? <Routes /> : <ActivityIndicator />}
        </NativeBaseProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
