import { useEffect } from "react"
import { post } from "services/axios"
import { useAssetStats } from "network/hooks"

const BunnyPlayer = ({
  videoId,
  id,
}: {
  videoId: string | number
  id: number
}) => {
  const { data, mutate } = useAssetStats(id)
  useEffect(() => {
    // Register video view count on page load
    try {
      if (typeof window !== "undefined") {
        post(`/assets/${id}/stats`, {
          assetID: id,
          updateValue: "view",
        })
        mutate({
          id,
          likes: data?.likes || 0,
          views: (data?.views || 0) + 1,
        })
      }
    } catch (error: any) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div
      style={{
        position: "relative",
        paddingTop: "56.25%",
      }}
    >
      <iframe
        src={`${process.env.NEXT_PUBLIC_BUNNY_VIDEO_PLAYER_IFRAME_URL}/${process.env.NEXT_PUBLIC_BUNNY_VIDEO_LIBRARY_ID}/${videoId}`}
        loading="lazy"
        style={{
          border: "none",
          position: "absolute",
          top: 0,
          height: "100%",
          width: "100%",
        }}
        allowFullScreen={true}
      />
    </div>
  )
}

export default BunnyPlayer
