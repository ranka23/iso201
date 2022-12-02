import Icon from "components/widgets/Icon/Icon"
import reel from "public/icons/reel.svg"
import { useCallback, useEffect, useState } from "react"
import { THUMBNAIL_WIDTH } from "../../../constants"
import { useRef } from "react"
import Skeleton from "react-loading-skeleton"

const bunnyPullZone = process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE_URL
const imageURL = process.env.NEXT_PUBLIC_BUNNY_IMAGE_STORAGE_URL
const width = THUMBNAIL_WIDTH

interface VideoProps {
  data: ListDataHits
  showIcon?: boolean
}

const Video: React.FC<VideoProps> = ({
  data: { thumbnail, poster, scale },
  showIcon = true,
}) => {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const [showReel, setShowReel] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (videoRef.current && typeof videoRef !== "string") {
      // @ts-ignore
      const poster = videoRef.current?.poster as string
      const image = new Image()
      image.onload = function () {
        setIsLoading(false)
      }
      image.src = poster
    }
  }, [])

  const handleOnMouseOver = useCallback(
    (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
      try {
        const isPlaying =
          e?.currentTarget?.currentTime > 0 &&
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
      } catch (error: any) {}
    },
    []
  )

  const handleOnMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
      e.currentTarget.pause()
      e.currentTarget.currentTime = 0
      setShowReel(true)
    },
    []
  )

  return (
    <>
      <Skeleton
        width={width}
        className={!isLoading ? "hidden opacity-0" : ""}
        containerClassName={!isLoading ? "hidden opacity-0" : ""}
        height={scale[0] > scale[1] ? 222.183 : 702.217}
      />
      <div ref={ref} className={`relative max-w-[${width}px]`}>
        <div
          className={`absolute right-3 bottom-1 opacity-80 ${
            showReel ? "" : "opacity-0"
          } hover:transition-opacity transition-opacity`}
        >
          {showIcon ? <Icon src={reel} width={28} /> : false}
        </div>
        <video
          ref={videoRef}
          preload="none"
          controls={false}
          poster={imageURL + "/" + poster}
          className="overflow-hidden"
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
          playsInline
          muted
          style={{
            width: `${width}px`,
          }}
        >
          <source src={`${bunnyPullZone}/${thumbnail}/play_360p.mp4`} />
        </video>
      </div>
    </>
  )
}
export default Video
