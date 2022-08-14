import Image from "next/image"

interface IconProps {
  name?: string
  width?: number
  height?: number
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | undefined
  className?: string
  src?: any
}

const Icon = ({ name = "an", width, height, layout, className, src }: IconProps) => (
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
    />
  </div>
)

export default Icon
