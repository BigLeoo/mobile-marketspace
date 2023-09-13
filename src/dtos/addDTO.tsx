/* eslint-disable camelcase */
import { paymant_methods } from './paymantMethodsDTO'
import { productImageDTO } from './productImageDTO'

export type AddDTO = {
  accept_trade: boolean
  id: string
  is_new: boolean
  name: string
  payment_methods: paymant_methods[] // Você pode definir um tipo específico para payment_methods se souber a estrutura
  price: number
  product_images: productImageDTO[] // Você pode definir um tipo específico para product_images se souber a estrutura
  user: {
    avatar: string
  }
}