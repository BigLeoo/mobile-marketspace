import * as yup from 'yup'

const signUpSchema = yup
  .object({
    name: yup.string().required('Informe o título do produto'),
    description: yup.string().required('Informe a descrição do produto'),
    is_new: yup.boolean().required('Informe o estado do produto'),
    price: yup.number().required('Informe preço do produto'),
    accept_trade: yup.boolean().required('Informe se o anúncio aceita troca'),
    boleto: yup.boolean(),
    pix: yup.boolean(),
    cash: yup.boolean(),
    card: yup.boolean(),
    deposit: yup.boolean(),
  })
  .required()
  .test('paymantMethodsError', null, (obj) => {
    const { boleto, pix, cash, card, deposit } = obj
    if (!(boleto || pix || cash || card || deposit)) {
      return new yup.ValidationError(
        'Selecione ao menos um método de pagamento',
        null,
        'paymantMethodsError',
      )
    }
    return true
  })

export { signUpSchema }
