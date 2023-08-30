/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */
import { ReactNode, useState, createContext, useEffect } from 'react'
import { UserDTO } from '../dtos/userDTO'
import { api } from '../services/api'
import { storageUserGet, storageUserSave } from '../storage/storageUser'
import { storageAuthTokenRemove, storageTokenRefreshTokenGet, storageTokenRefreshTokenSave } from '../storage/storageAuthToken'

export type AuthContextDataProps = {
  user: UserDTO
  userToken: string
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => void
  signOut: () => void
  updateToken: (token: string) => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [userToken, setUserToken] = useState<string>('')

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function signIn(email: string, password: string) {
    try {
      const {data} = await api.post('/sessions', { email, password })

      // console.log('Refresh Token', data.refresh_token)

      if(data.user && data.token && data.refresh_token) {

        setIsLoadingUserStorageData(true)

        await storageTokenRefreshTokenSave(
         {token: data.token,
          refreshToken: data.refresh_token}
        )

        await storageUserSave(data.user)
        
        setUser(data.user)
        setUserToken(data.token)
      }

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const userData = await storageUserGet()

      const tokenData = await storageTokenRefreshTokenGet()

      setUser(userData)
      setUserToken(tokenData.token)

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setUser({} as UserDTO)
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    }
  }

  async function updateToken(token: string){
    setUserToken(token)
  }


  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        userToken,
        signOut,
        isLoadingUserStorageData,
        updateToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
