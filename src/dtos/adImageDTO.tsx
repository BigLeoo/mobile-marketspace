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

export type adImageDTO = {
  assets: Assets[]
  canceled: boolean
  cancelled: boolean
}
