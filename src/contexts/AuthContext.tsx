/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */
import { ReactNode, useState, createContext, useEffect } from 'react'
import { UserDTO } from '../dtos/userDTO'
import { api } from '../services/api'
import { storageUserGet, storageUserSave } from '../storage/storageUser'
import { storageTokenRefreshTokenGet, storageTokenRefreshTokenSave } from '../storage/storageAuthToken'

export type AuthContextDataProps = {
  user: UserDTO
  userToken: string
  signIn: (email: string, password: string) => void
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

  async function signIn(email: string, password: string) {
    try {
      const {data} = await api.post('/sessions', { email, password })

      // console.log(response.data)

      setUser(data.user)
      setUserToken(data.token)
      storageUserSave(data.user)
      storageTokenRefreshTokenSave(
        data.token,
        data.refresh-token,
      )
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      const userData = await storageUserGet()

      const tokenData = await storageTokenRefreshTokenGet()

      setUser(userData)
      setUserToken(tokenData.token)

    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        userToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
