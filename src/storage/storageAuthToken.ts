import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_AUTHENTICATION } from './storageConfig'

type StorageAuthTokenProps = {
  token: string
  refreshToken: string
}

export async function storageTokenRefreshTokenSave({
  token,
  refreshToken,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    USER_AUTHENTICATION,
    JSON.stringify({ token, refreshToken }),
  )
}

export async function storageTokenRefreshTokenGet() {
  const dataAuthentication = await AsyncStorage.getItem(USER_AUTHENTICATION)

  const { token, refreshToken }: StorageAuthTokenProps = dataAuthentication
    ? JSON.parse(dataAuthentication)
    : {}

  return { token, refreshToken }
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(USER_AUTHENTICATION)
}
