import * as yup from 'yup'

const signUpSchema = yup
  .object({
    name: yup.string().required('Informe o título do produto'),
    description: yup.string().required('Informe a descrição do produto'),
    is_new: yup.boolean().required('Informe o estado do produto'),
    price: yup.number().required('Informe preço do produto'),
    accept_trade: yup.boolean().required('Informe se o anúncio aceita troca'),
    paymant_methods: yup
      .array()
      .min(1, 'Selecione ao menos um método de pagamento')
      .required('Informe os métodos de pagamento'),
    // paymant_methods2: yup
    //   .object({
    //     pix: yup.boolean().optional(),
    //     boleto: yup.boolean().optional(),
    //     card: yup.boolean().optional(),
    //     deposit: yup.boolean().optional(),
    //     cash: yup.boolean().optional(),
    //   })
    //   .test(
    //     'atLeastOneSelected',
    //     'Selecione ao menos 1 método de pagamento',
    //     (obj) => {
    //       const { pix, boleto, card, deposit, cash } = obj
    //       console.log(
    //         'PIX ',
    //         pix,
    //         'Boleto ',
    //         boleto,
    //         'CARD: ',
    //         card,
    //         'DEPOSIT: ',
    //         deposit,
    //         'CASH: ',
    //         cash,
    //       )

    //       if (pix || boleto || card || deposit || cash) {
    //         return true
    //       }
    //       return false
    //     },
    //   ),
    // paymant_methods2: paymentMethodsValidation,
  })
  .required()

const paymantMethodsOptions: {
  value: keyof FormDataProps['paymant_methods2']
  title: string
}[] = [
  {
    value: 'pix',
    title: 'Pix',
  },
  {
    value: 'boleto',
    title: 'Boleto',
  },
  {
    value: 'card',
    title: 'Cartão de crédito',
  },
  {
    value: 'deposit',
    title: 'Depósito Bancário',
  },
  {
    value: 'cash',
    title: 'Dinheiro',
  },
]

export { paymantMethodsOptions }

export { signUpSchema }
