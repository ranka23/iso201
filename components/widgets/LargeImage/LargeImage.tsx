import { ImageProps } from "next/image"

interface LargeImageProps extends ImageProps {}

const { NEXT_PUBLIC_BUNNY_IMAGE_STORAGE_URL } = process.env

const LargeImage: React.FC<LargeImageProps> = ({ src, alt }) => {
  const url = `${NEXT_PUBLIC_BUNNY_IMAGE_STORAGE_URL}/${src}`
  return (
    <div>
      <a href={url} target="_blank" rel="noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={alt} />
      </a>
    </div>
  )
}
export default LargeImage
