import Download from "components/Download/Download"
import BreadCrumb from "components/widgets/BreadCrumb/BreadCrumb"
import PremiumBadge from "components/widgets/PremiumBadge/PremiumBadge"
import millify from "millify"
import { useAssetStats } from "network/hooks"
import { useMemo } from "react"
import LikeWithCount from "../widgets/Like/LikeWithCount"

interface Props {
  id: number
  title: string
  genre: string
  album: string
  fname: string
  mime: string
  description: string
  isFree: boolean
  scale: [number, number]
  size: string
  duration: string
  fps: number
  tags: Array<string>
  type: AssetType
}

const AssetDetails: React.FC<Props> = ({
  id,
  title,
  genre,
  album,
  fname,
  mime,
  description,
  isFree,
  scale,
  size,
  duration,
  fps,
  tags,
  type,
}) => {
  const { data } = useAssetStats(id)

  const fileData = useMemo(() => {
    const fileInfo = [
      {
        label: "Resolution",
        value: `${scale[0]}x${scale[1]}`,
      },
      {
        label: "Size",
        value: size,
      },
      {
        label: "Type",
        value: mime,
      },
    ]
    if (type === "video") {
      fileInfo.splice(0, 0, {
        label: "Duration",
        value: `${duration}s`,
      })
      fileInfo.splice(3, 0, {
        label: "FPS",
        value: fps.toString(),
      })
    }
    return fileInfo
  }, [duration, fps, mime, scale, size, type])

  return (
    <div>
      <h2 className="text-2xl font-medium mt-4">{title}</h2>
      <div className="flex item-center gap-3 mt-2">
        {!isFree ? <PremiumBadge /> : null}
        <BreadCrumb levels={[genre, album]} />
      </div>
      <div className="flex justify-between items-center mt-2 mb-2">
        <div className="flex items-center">
          <Download fname={fname} id={id} mime={mime} />
          <LikeWithCount id={id} />
        </div>
        {data?.views && data.views !== 0 ? (
          <span className="text-xl font-medium">
            {millify(data.views) + " " + (data.views === 1 ? "view" : "views")}
          </span>
        ) : null}
      </div>
      <div className="flex items-center gap-12 mb-6">
        {fileData.map((item) => (
          <div key={item.label}>
            <span className="font-medium mr-1">{item.label}</span>
            <span className="text-xl">{item.value}</span>
          </div>
        ))}
      </div>
      <p className="mb-6">{description}</p>
      <span>
        {tags.map((item) => (
          <span className="py-2 px-3 rounded bg-[#eee] mr-4 mb-2 inline-block" key={item}>
            {item}
          </span>
        ))}
      </span>
    </div>
  )
}

export default AssetDetails
