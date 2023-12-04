/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */
import { ReactNode, useState, createContext, useEffect } from 'react'
import { UserDTO } from '../dtos/userDTO'
import { api } from '../services/api'
import { storageUserGet, storageUserSave } from '../storage/storageUser'
import { storageAuthTokenRemove, storageTokenRefreshTokenGet, storageTokenRefreshTokenSave } from '../storage/storageAuthToken'

export type AuthContextDataProps = {
  user: UserDTO
 
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => void
  signOut: () => void

}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)


  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function signIn(email: string, password: string) {
    try {
      const {data} = await api.post('/sessions', { email, password })

    
      if(data.user && data.token && data.refresh_token) {

        setIsLoadingUserStorageData(true)

        await storageTokenRefreshTokenSave(
         {token: data.token,
          refreshToken: data.refresh_token}
        )

        await storageUserSave(data.user)
        
        setUser(data.user)
    
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

      const {token} = await storageTokenRefreshTokenGet()

      setUser(userData)


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

        signOut,
        isLoadingUserStorageData,
  
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
