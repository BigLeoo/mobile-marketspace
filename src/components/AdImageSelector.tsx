import { Box, FlatList, HStack, Image, useTheme } from 'native-base'
import { Plus, XCircle } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { useProducts } from '../hooks/useProducts'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

export function AdImageSelector() {
  const { colors } = useTheme()

  const { setCreateAdImage, createAdImage, editAdData, setEditAdData } =
    useProducts()

  const [isEditingAdImage, setIsEditingAdImage] = useState(false)

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

    setCreateAdImage((prevState: string[]) => [...prevState, photoSelected])
  }

  useEffect(() => {
    if (editAdData) {
      setIsEditingAdImage(true)
    } else {
      setIsEditingAdImage(false)
    }

    console.log(editAdData.images.length)
  })

  return (
    <Box>
      {editAdData.images.length < 3 && createAdImage.length < 3 ? (
        <HStack alignItems={'center'} justifyContent={'center'}>
          <FlatList
            data={isEditingAdImage ? editAdData.images : createAdImage}
            horizontal
            renderItem={({ item }) => (
              <Box w={'100px'} h={'100px'} borderRadius={'6px'} mr={'8px'}>
                <Image
                  source={
                    isEditingAdImage
                      ? { uri: `${api.defaults.baseURL}/images/${item.path}` }
                      : { uri: item.assets[0].uri }
                  }
                  alt="Product image"
                  w={'full'}
                  h={'full'}
                  borderRadius={'6px'}
                />
                <Box position={'absolute'} left={'80px'} top={'3px'}>
                  {isEditingAdImage ? (
                    <TouchableOpacity
                      onPress={() =>
                        setEditAdData((prevState) =>
                          prevState.images.filter(
                            (image) => image.path !== item.path,
                          ),
                        )
                      }
                    >
                      <XCircle
                        size={16}
                        weight="fill"
                        color={colors.gray[200]}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        setCreateAdImage((prevState) =>
                          prevState.filter(
                            (productImageUri) =>
                              productImageUri.assets[0].uri !==
                              item.assets[0].uri,
                          ),
                        )
                      }
                    >
                      <XCircle
                        size={16}
                        weight="fill"
                        color={colors.gray[200]}
                      />
                    </TouchableOpacity>
                  )}
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
            data={isEditingAdImage ? editAdData.images : createAdImage}
            horizontal
            renderItem={({ item }) => (
              <Box w={'100px'} h={'100px'} borderRadius={'6px'} mr={'10px'}>
                <Image
                  source={
                    isEditingAdImage
                      ? { uri: `${api.defaults.baseURL}/images/${item.path}` }
                      : { uri: item.assets[0].uri }
                  }
                  alt="Product image"
                  w={'full'}
                  h={'full'}
                  borderRadius={'6px'}
                />
                <Box position={'absolute'} left={'80px'} top={'3px'}>
                  {isEditingAdImage ? (
                    <TouchableOpacity
                      onPress={() =>
                        setCreateAdImage((prevState) =>
                          prevState.filter(
                            (productImageUri) =>
                              productImageUri.assets[0].uri !==
                              item.assets[0].uri,
                          ),
                        )
                      }
                    >
                      <XCircle
                        size={16}
                        weight="fill"
                        color={colors.gray[200]}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        setCreateAdImage((prevState) =>
                          prevState.filter(
                            (productImageUri) =>
                              productImageUri.assets[0].uri !==
                              item.assets[0].uri,
                          ),
                        )
                      }
                    >
                      <XCircle
                        size={16}
                        weight="fill"
                        color={colors.gray[200]}
                      />
                    </TouchableOpacity>
                  )}
                </Box>
              </Box>
            )}
          />
        </HStack>
      )}
    </Box>
  )
}
