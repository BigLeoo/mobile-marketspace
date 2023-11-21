import * as yup from 'yup'

const signUpSchema = yup
  .object({
    is_new: yup.boolean().optional(),
    is_used: yup.boolean().optional(),
    accept_trade: yup.boolean().optional(),
    boleto: yup.boolean(),
    pix: yup.boolean(),
    cash: yup.boolean(),
    credit_card: yup.boolean(),
    deposit: yup.boolean(),
  })
  .required()
  .test('at-least-one-true', null, (obj) => {
    const { boleto, pix, cash, card, deposit } = obj
    if (!(boleto || pix || cash || card || deposit)) {
      return new yup.ValidationError(
        'Pelo menos uma opção deve ser verdadeira',
        null,
        'at-least-one-true',
      )
    }
    return true
  })

const defaultHomeFilter = {
  is_new: false,
  is_used: false,
  accept_trade: false,
  boleto: false,
  pix: false,
  cash: false,
  card: false,
  deposit: false,
}

export { signUpSchema, defaultHomeFilter }
