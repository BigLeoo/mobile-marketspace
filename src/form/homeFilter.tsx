import * as yup from 'yup'

const signUpSchema = yup
  .object({
    is_new: yup.boolean().optional(),
    is_used: yup.boolean().optional(),
    accept_trade: yup.boolean().optional(),
    paymant_methods: yup.array().optional(),
  })
  .required()

const defaultHomeFilter = {
  paymant_methods: [],
}

export { signUpSchema, defaultHomeFilter }
