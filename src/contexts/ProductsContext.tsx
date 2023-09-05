/* eslint-disable prefer-const */
/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
import { ReactNode, createContext, useState } from 'react'
import { api } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import { useToast } from 'native-base'

type paymant_methods = {
  paymants: 'boleto' | 'pix' | 'cash' | 'card' | 'deposit'
}

export type ProductsContextDataProps = {
  createProduct: (
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    payment_methods: paymant_methods[],
  ) => void

  setCreateAdImage: () => void

  createAdImage: string[]
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
  const { userToken } = useAuth()

  const [createAdImage, setCreateAdImage] = useState<string[]>([])

  const toast = useToast()

  async function createProduct(
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    payment_methods: [paymant_methods],
    createAdImage: string[],
  ) {
    try {
      if (createAdImage.length === 0) {
        toast.show({
          title: 'Por favor, adicione pelo menos uma imagem do produto.',
          placement: 'top',
          bgColor: 'red.500',
        })

        return
      }

      const { data } = await api.post(
        '/products',
        {
          name,
          description,
          is_new,
          price,
          accept_trade,
          payment_methods,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        },
      )

      await imageCreateProduct(data.id, createAdImage)
    } catch (error) {
      throw error
    }
  }

  async function imageCreateProduct(productId: string, adImages: string[]) {
    try {
      const productImageForm = new FormData()

      productImageForm.append('product_id', productId)

      adImages.forEach((image) => {
        const fileExtension = image.assets[0].uri.split('.').pop()

        const photoFile = {
          name: `${productId}-${Math.random()}.${fileExtension}`.toLowerCase(),
          uri: image.assets[0].uri,
          type: `${image.assets[0].type}/${fileExtension}`,
        }

        productImageForm.append('images', photoFile)
      })

      setCreateAdImage([])

      await api.post('/products/images', productImageForm, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      throw error
    }
  }

  return (
    <ProductsContext.Provider
      value={{ createProduct, setCreateAdImage, createAdImage }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
