/* eslint-disable camelcase */
import { paymantMethodsDTO } from './paymantMethodsDTO'
import { productImageDTO } from './productImageDTO'

type userType = {
  avatar: string
  name: string
  tel: string
}

export type addDetailDTO = {
  accept_trade: boolean
  created_at: string
  description: string
  id: string
  is_active: boolean
  is_new: boolean
  name: string
  payment_methods: paymantMethodsDTO[] // Você pode definir um tipo específico para payment_methods se souber a estrutura
  price: number
  product_images: productImageDTO[] // Você pode definir um tipo específico para product_images se souber a estrutura
  updated_at: string
  user_id: string
  user: userType
}
