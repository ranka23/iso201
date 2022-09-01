import Image from "next/image"
import { MouseEventHandler } from "react"

interface IconProps {
  name?: string
  width?: number
  height?: number
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | undefined
  className?: string
  src?: any
  onClick?: MouseEventHandler<HTMLImageElement>
}

const Icon = ({
  name = "",
  width,
  height,
  layout,
  className,
  src,
  onClick,
}: IconProps) => (
  <div
    className={
      width || height
        ? `${className || ""} flex items-center`
        : `w-full h-full flex-items-center ${className || ""}`
    }
  >
    <Image
      alt={`${name} icon`}
      src={src}
      width={width}
      height={height}
      layout={layout}
      objectFit="contain"
      onClick={onClick}
    />
  </div>
)

export default Icon
