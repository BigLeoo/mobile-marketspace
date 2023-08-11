import { Image, VStack, View } from 'native-base'

import tenisPng from '../../assets/shoes.png'

import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import { Avatar } from './Avatar'

type AdsProps = IVStackProps

export function Ads({ ...rest }: AdsProps) {
  return (
    <VStack {...rest}>
      <View position={'relative'}>
        <Image
          source={tenisPng}
          alt="Anúncio do usuário"
          width={37}
          height={25}
          borderRadius={6}
        />

        <Avatar
          imageSize={12}
          avatarImage={'https://github.com/BigLeoo.png'}
          position={'absolute'}
          zIndex={12}
          top={10}
          left={10}
        />
      </View>
    </VStack>
  )
}
