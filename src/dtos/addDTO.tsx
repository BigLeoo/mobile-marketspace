/* eslint-disable camelcase */
import { paymantMethodsDTO } from './paymantMethodsDTO'
import { productImageDTO } from './productImageDTO'

export type AddDTO = {
  accept_trade: boolean
  id: string
  is_new: boolean
  name: string
  payment_methods: paymantMethodsDTO[] // Você pode definir um tipo específico para payment_methods se souber a estrutura
  price: number
  product_images: productImageDTO[] // Você pode definir um tipo específico para product_images se souber a estrutura
  user: {
    avatar: string
  }
}
