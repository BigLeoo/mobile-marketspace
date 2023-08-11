import { IImageProps, Image, View } from 'native-base'
// import { TouchableOpacity } from 'react-native'

import { PencilSimpleLine } from 'phosphor-react-native'

import AvatarPng from '../../assets/avatarImg.png'

type AvatarProps = IImageProps & {
  variant?: 'normal' | 'edit'
  imageSize: number
  avatarImage?: string
}

export function Avatar({
  avatarImage,
  imageSize,
  variant = 'normal',
  ...rest
}: AvatarProps) {
  return (
    <View>
      {avatarImage ? (
        <Image
          source={{ uri: avatarImage }}
          rounded={99}
          alt="avatar image"
          size={imageSize}
          borderRadius={99}
          borderColor={'blue.700'}
          borderWidth={2}
          background={'gray.500'}
          position={'relative'}
          {...rest}
        />
      ) : (
        <Image
          source={AvatarPng}
          rounded={99}
          borderRadius={99}
          borderColor={'blue.700'}
          borderWidth={3}
          background={'gray.500'}
          position={'relative'}
          alt="avatar image"
          size={imageSize}
          {...rest}
        />
      )}

      {variant === 'edit' ? (
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
      ) : (
        <></>
      )}
    </View>
  )
}
