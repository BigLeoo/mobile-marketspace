import { Box, FlatList, HStack, Image, View, useTheme } from 'native-base'
import { Plus, XCircle } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'

type CreateAdImage = {
  images?: string[]
}

// ['https://github.com/BigLeoo.png']

export function CreateAdImage({
  images = ['https://github.com/BigLeoo.png'],
}: CreateAdImage) {
  const { colors } = useTheme()

  //   console.log(images.length)

  return (
    <Box
    //   bg={'gray.500'}
    //   w={'100px'}
    //   h={'100px'}
    //   borderRadius={'6px'}
    //   justifyContent={'center'}
    //   alignItems={'center'}
    >
      {!images ? (
        <Box
          bg={'gray.500'}
          w={'100px'}
          h={'100px'}
          borderRadius={'6px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Plus size={24} color={colors.gray[400]} />
        </Box>
      ) : images.length < 3 ? (
        <HStack alignItems={'center'} justifyContent={'center'} space={'8px'}>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <Box w={'100px'} h={'100px'} borderRadius={'6px'}>
                <Image
                  src={item}
                  alt="Product image"
                  w={'full'}
                  h={'full'}
                  borderRadius={'6px'}
                />
                <Box position={'absolute'} left={'80px'} top={'3px'}>
                  <TouchableOpacity>
                    <XCircle size={16} weight="fill" color={colors.gray[200]} />
                  </TouchableOpacity>
                </Box>
              </Box>
            )}
          />

          <TouchableOpacity>
            <Box
              bg={'gray.500'}
              w={'100px'}
              h={'100px'}
              borderRadius={'6px'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Plus size={24} color={colors.gray[400]} />
            </Box>
          </TouchableOpacity>
        </HStack>
      ) : (
        <></>
      )}
    </Box>
  )
}
