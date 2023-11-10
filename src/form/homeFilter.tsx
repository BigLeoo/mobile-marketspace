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
  is_new: false,
  is_used: false,
  accept_trade: false,
  paymant_methods: [],
}

function handleSubmit() {}

export { signUpSchema, defaultHomeFilter }
