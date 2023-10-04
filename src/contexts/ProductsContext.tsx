/* eslint-disable prefer-const */
/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
import { ReactNode, createContext, useState } from 'react'

import { useAuth } from '../hooks/useAuth'

import { api } from '../services/api'

import { paymant_methods } from '../dtos/paymantMethodsDTO'
import { userAddDTO } from '../dtos/userAddDTO'
import { AddDTO } from '../dtos/addDTO'
import { productImageDTO } from '../dtos/productImageDTO'
import { adImageDTO } from '../dtos/adImageDTO'
import { addDetailDTO } from '../dtos/addDetailDTO'

export type ProductsContextDataProps = {
  createProduct: (
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    payment_methods: paymant_methods[],
  ) => Promise<void>
  setCreateAdImage: () => Promise<adImageDTO[]>
  changeAdStatus: (id: string, is_active: boolean) => void
  deleteAd: (id: string) => void

  fetchUserAds: () => Promise<userAddDTO[]>

  fetchAds: () => Promise<AddDTO[]>
  fetchAdImage: (path: string) => Promise<productImageDTO>
  fetchAdDetail: (id: string) => Promise<addDetailDTO>

  createAdImage: adImageDTO[]
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

  const [createAdImage, setCreateAdImage] = useState<adImageDTO[]>([])

  async function createProduct(
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    payment_methods: paymant_methods[],
  ) {
    try {
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

  async function imageCreateProduct(productId: string, adImages: adImageDTO[]) {
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

  async function changeAdStatus(id: string, is_active: boolean) {
    try {
      await api.patch(
        `/products/${id}`,
        { is_active },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
    } catch (error) {
      throw error
    }
  }

  async function deleteAd(id: string) {
    try {
      await api.delete(`products/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw error
    }
  }

  async function fetchUserAds() {
    try {
      const { data } = await api.get('/users/products', {
        headers: { Authorization: `Bearer ${userToken}` },
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async function fetchAds() {
    try {
      const { data } = await api.get('/products', {
        headers: { Authorization: `Bearer ${userToken}` },
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async function fetchAdDetail(id: string) {
    try {
      const { data } = await api.get(`/products/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async function fetchAdImage(path: string) {
    const data = await api.get(`/images/${path}`)

    return data
  }

  return (
    <ProductsContext.Provider
      value={{
        createProduct,
        setCreateAdImage,
        createAdImage,
        changeAdStatus,
        fetchUserAds,
        fetchAds,
        fetchAdImage,
        fetchAdDetail,
        deleteAd,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
