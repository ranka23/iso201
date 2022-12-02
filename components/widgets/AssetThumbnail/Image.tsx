import {
  LANDSCAPE_THUMBNAIL_HEIGHT,
  PORTRAIT_THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from "constants/"
import NextImage from "next/image"
import { useCallback, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"

interface Props {
  data: ListDataHits
  alt: string
}

const imageURL = process.env.NEXT_PUBLIC_BUNNY_IMAGE_STORAGE_URL

const Image: React.FC<Props> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false)
  const isHorizontal = data.scale[0] > data.scale[1]
  useEffect(() => {
    setIsLoading(true)
  }, [])

  const handleAssetLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      <Skeleton
        width={THUMBNAIL_WIDTH}
        className={!isLoading ? "hidden opacity-0" : "overflow-hidden"}
        containerClassName={!isLoading ? "hidden opacity-0" : "overflow-hidden"}
        height={
          isHorizontal ? LANDSCAPE_THUMBNAIL_HEIGHT : PORTRAIT_THUMBNAIL_HEIGHT
        }
      />
      <NextImage
        width={THUMBNAIL_WIDTH}
        height={
          isHorizontal ? LANDSCAPE_THUMBNAIL_HEIGHT : PORTRAIT_THUMBNAIL_HEIGHT
        }
        src={imageURL + "/" + data.thumbnail}
        alt={data.title}
        key={data.id}
        className="overflow-hidden"
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}
export default Image
