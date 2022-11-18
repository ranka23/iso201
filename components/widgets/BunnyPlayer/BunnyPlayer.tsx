const libraryId = process.env.NEXT_PUBLIC_BUNNY_VIDEO_LIBRARY_ID

const BunnyPlayer = ({ videoId }: { videoId: string | number }) => {
  return (
    <div
      style={{
        position: "relative",
        paddingTop: "56.25%",
      }}
    >
      <iframe
        src={`https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=true`}
        loading="lazy"
        style={{
          border: "none",
          position: "absolute",
          top: 0,
          height: "100%",
          width: "100%",
        }}
        allowFullScreen={true}
      ></iframe>
    </div>
  )
}

export default BunnyPlayer
