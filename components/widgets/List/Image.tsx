import {
  LANDSCAPE_THUMBNAIL_HEIGHT,
  PORTRAIT_THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from "constants/"
import NextImage from "next/image"

interface ImageProps {
  data: ScrollData
  alt: string
}

const imageURL = process.env.NEXT_PUBLIC_BUNNY_IMAGE_STORAGE_URL

const Image: React.FC<ImageProps> = ({ data }) => {
  const isHorizontal = data.scale[0] > data.scale[1]
  return (
    <>
      <NextImage
        width={THUMBNAIL_WIDTH}
        height={
          isHorizontal ? LANDSCAPE_THUMBNAIL_HEIGHT : PORTRAIT_THUMBNAIL_HEIGHT
        }
        src={imageURL + "/" + data.thumbnail}
        alt={data.title}
        key={data.id}
        className="overflow-hidden"
      />
    </>
  )
}
export default Image
