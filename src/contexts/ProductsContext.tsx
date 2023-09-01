/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
import { ReactNode, createContext, useState } from 'react'
import { api } from '../services/api'
import { useAuth } from '../hooks/useAuth'

type paymant_methods = {
  paymants: 'boleto' | 'pix' | 'cash' | 'card' | 'deposit'
}

export type ProductsContextDataProps = {
  postProducts: (
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    payment_methods: paymant_methods[],
  ) => void
}

type ProductsContextProviderProps = {
  children: ReactNode
}

export const ProductsContext = createContext<ProductsContextDataProps>(
  {} as ProductsContextDataProps,
)

export function ProductsContextProvider({
  children,
}: ProductsContextProviderProps) {
  const [products, setProducts] = useState()

  const { userToken } = useAuth()

  async function postProducts(
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    payment_methods: paymant_methods[],
  ) {
    console.log(name, description, is_new, price, accept_trade, payment_methods)

    try {
      console.log(userToken)

      const { data } = await api.post(
        '/products',
        {
          name: 'Luminária Pendente',
          description:
            'Essa é a melhor luminária do mundo. Você não vai se arrepender.',
          is_new: true,
          price: 45000,
          accept_trade: true,
          payment_methods: [['pix', 'card']],
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        },
        // { headers: { token: userToken } },
      )

      console.log(data)
    } catch (error) {
      throw error
    }
  }

  return (
    <ProductsContext.Provider value={{ postProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}
