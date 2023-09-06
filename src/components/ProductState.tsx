/* eslint-disable camelcase */
import { Heading, View } from 'native-base'
import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types'

type ProductStateProps = IViewProps & {
  is_new: boolean
}

export function ProductState({ is_new, ...rest }: ProductStateProps) {
  return (
    <View
      {...rest}
      backgroundColor={!is_new ? 'gray.200' : 'blue.500'}
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={99}
      py={1}
      px={2}
      display={'block'}
    >
      <Heading color={'gray.700'} fontFamily={'heading'} fontSize={'xxs'}>
        {!is_new ? 'USADO' : 'NOVO'}
      </Heading>
    </View>
  )
}
