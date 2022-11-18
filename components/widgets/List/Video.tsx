import Icon from "components/widgets/Icon/Icon"
import reel from "public/icons/reel.svg"
import { useState } from "react"
import { THUMBNAIL_WIDTH } from "../../../constants"

const bunnyPullZone = process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE_URL
const imageURL = process.env.NEXT_PUBLIC_BUNNY_IMAGE_STORAGE_URL
const width = THUMBNAIL_WIDTH

interface VideoProps {
  data: ScrollData
}

const Video: React.FC<VideoProps> = ({ data: { thumbnail, poster } }) => {
  const [showReel, setShowReel] = useState(true)
  const handleOnMouseOver = (
    e: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    const isPlaying =
      e.currentTarget.currentTime > 0 &&
      !e.currentTarget.paused &&
      !e.currentTarget.ended &&
      e.currentTarget.readyState > e.currentTarget.HAVE_CURRENT_DATA

    if (!isPlaying) {
      e.currentTarget
        .play()
        .then(() => e.currentTarget.pause())
        .catch((e) => console.log(e))
    }

    setShowReel(false)
  }

  const handleOnMouseLeave = (
    e: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    e.currentTarget.pause()
    e.currentTarget.currentTime = 0
    setShowReel(true)
  }

  return (
    <div className={`relative max-w-[${width}px]`}>
      <div className="absolute right-3 bottom-1">
        {showReel && <Icon src={reel} />}
      </div>
      <video
        preload="none"
        controls={false}
        poster={imageURL + "/" + poster}
        className="overflow-hidden"
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
        playsInline
        muted
      >
        <source src={`${bunnyPullZone}/${thumbnail}/play_360p.mp4`} />
      </video>
    </div>
  )
}
export default Video
