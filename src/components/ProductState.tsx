import { Heading, View } from 'native-base'
import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types'

type ProductStateProps = IViewProps & {
  ProductState: 'used' | 'new'
}

export function ProductState({ ProductState, ...rest }: ProductStateProps) {
  return (
    <View
      {...rest}
      backgroundColor={ProductState === 'used' ? 'gray.200' : 'blue.500'}
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={99}
      py={1}
      px={2}
      display={'block'}
    >
      <Heading color={'gray.700'} fontFamily={'heading'} fontSize={'xxs'}>
        {ProductState === 'used' ? 'USADO' : 'NOVO'}
      </Heading>
    </View>
  )
}
