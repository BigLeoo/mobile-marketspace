import { Box, FlatList, HStack, Image, useTheme } from 'native-base'
import { Plus, XCircle } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { useProducts } from '../hooks/useProducts'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

type Assets = {
  assetId: string | null
  base64: string | null
  duration: number | null
  exif: any | null
  height: number
  rotation: number | null
  type: string
  uri: string
  width: number
}

type imagesType = {
  id?: string
  path?: string
  assets?: Assets[]
  canceled?: boolean
  cancelled?: boolean
}

export function AdImageSelector() {
  const { colors } = useTheme()

  const { setCreateAdImage, createAdImage, editAdData, setEditAdData } =
    useProducts()

  const [isEditingAdImage, setIsEditingAdImage] = useState(false)

  const [images, setImages] = useState<imagesType>([])

  async function handleUserPhotoSelect() {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    })

    if (photoSelected.canceled) {
      return
    }

    // setCreateAdImage((prevState: string[]) => [...prevState, photoSelected])

    setImages((prevState) => [...prevState, photoSelected])
  }

  useEffect(() => {
    if (editAdData.images) {
      setIsEditingAdImage(true)
      setImages(editAdData.images)
    } else {
      setImages(createAdImage)
      setIsEditingAdImage(false)
    }
  }, [createAdImage, editAdData])

  useEffect(() => {
    console.log('IMAGES => ', images)
    console.log(images.length)
  }, [images])

  return (
    <Box>
      {images.length < 3 ? (
        <HStack alignItems={'center'} justifyContent={'center'}>
          <FlatList
            data={images}
            horizontal
            renderItem={({ item }) => (
              <Box w={'100px'} h={'100px'} borderRadius={'6px'} mr={'8px'}>
                <Image
                  source={
                    item.path
                      ? { uri: `${api.defaults.baseURL}/images/${item.path}` }
                      : { uri: item.assets[0].uri }
                  }
                  alt="Product image"
                  w={'full'}
                  h={'full'}
                  borderRadius={'6px'}
                />
                <Box position={'absolute'} left={'80px'} top={'3px'}>
                  <TouchableOpacity
                    onPress={() =>
                      setImages((prevState) =>
                        prevState.filter((image) => {
                          if (image.path) {
                            return image.path !== item?.path
                          }
                          if (image.assets[0]) {
                            return image.assets[0].uri !== item?.assets[0].uri
                          }
                        }),
                      )
                    }
                  >
                    <XCircle size={16} weight="fill" color={colors.gray[200]} />
                  </TouchableOpacity>
                </Box>
              </Box>
            )}
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
        <HStack alignItems={'center'} justifyContent={'center'} space={'8px'}>
          <FlatList
            data={images}
            horizontal
            renderItem={({ item }) => (
              <Box w={'100px'} h={'100px'} borderRadius={'6px'} mr={'10px'}>
                <Image
                  source={
                    item.path
                      ? { uri: `${api.defaults.baseURL}/images/${item.path}` }
                      : { uri: item.assets[0].uri }
                  }
                  alt="Product image"
                  w={'full'}
                  h={'full'}
                  borderRadius={'6px'}
                />
                <Box position={'absolute'} left={'80px'} top={'3px'}>
                  <TouchableOpacity
                    onPress={() =>
                      setImages((prevState) =>
                        prevState.filter((image) => {
                          if (image.path) {
                            return image.path !== item?.path
                          }
                          if (image.assets[0]) {
                            return image.assets[0].uri !== item?.assets[0].uri
                          }
                        }),
                      )
                    }
                  >
                    <XCircle size={16} weight="fill" color={colors.gray[200]} />
                  </TouchableOpacity>
                </Box>
              </Box>
            )}
          />
        </HStack>
      )}
    </Box>
  )
}
