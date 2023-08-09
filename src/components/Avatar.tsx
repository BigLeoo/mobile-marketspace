import { Image, View } from 'native-base'
import { PencilSimpleLine } from 'phosphor-react-native'
import AvatarPng from '../../assets/avatarImg.png'
import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types'

type AvatarProps = IViewProps

export function Avatar({ ...rest }: AvatarProps) {
  return (
    <View
      borderRadius={96}
      borderColor={'blue.700'}
      borderWidth={3}
      background={'gray.500'}
      position={'relative'}
      {...rest}
    >
      <Image source={AvatarPng} alt="avatar image" size={22} />
      <View
        background={'blue.700'}
        borderRadius={96}
        position={'absolute'}
        top={12}
        left={16}
        p={3}
        zIndex={12}
      >
        <PencilSimpleLine size={16} color="#EDECEE" />
      </View>
    </View>
  )
}
