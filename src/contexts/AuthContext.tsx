/* eslint-disable no-useless-catch */
import { ReactNode, useState, createContext, useEffect } from 'react'
import { UserDTO } from '../dtos/userDTO'
import { api } from '../services/api'
import { storageUserGet, storageUserSave } from '../storage/storageUser'

export type AuthContextDataProps = {
  user: UserDTO
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

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('/sessions', { email, password })

      console.log(response)

      setUser(response.data.user)
      storageUserSave(response.data.user)
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      const userData = await storageUserGet()

      setUser(userData)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    // loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
