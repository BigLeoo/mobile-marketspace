import {
  FormControl,
  ITextAreaProps,
  TextArea as NativeBaseTextArea,
} from 'native-base'

type Props = ITextAreaProps & {
  errorMessage?: string | null
  isInvalid?: boolean
}

export function TextArea({ errorMessage, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseTextArea
        autoCompleteType={true}
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
