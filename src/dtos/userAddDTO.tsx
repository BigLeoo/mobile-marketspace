/* eslint-disable camelcase */
import { paymant_methods } from './paymantMethodsDTO'
import { productImageDTO } from './productImageDTO'

export type userAddDTO = {
  accept_trade: boolean
  created_at: string
  description: string
  id: string
  is_active: boolean
  is_new: boolean
  name: string
  payment_methods: paymant_methods[] // Você pode definir um tipo específico para payment_methods se souber a estrutura
  price: number
  product_images: productImageDTO[] // Você pode definir um tipo específico para product_images se souber a estrutura
  updated_at: string
  user_id: string
}
