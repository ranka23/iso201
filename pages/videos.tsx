import Link from "next/link"
import Hero from "../components/pages/Home/Hero/Hero"

const Videos = () => {
  return (
    <main>
      <Hero
        bgURL="/video.webp"
        description="4K and HD Videos for your youtube channel, social media and more..."
        heading="Videos for Creators"
        title="iso201"
      />
      <div
        id="video-thumbnail"
        className="md:columns-3 mt-6 md:w-[80%] m-auto gap-8"
      >
        <Link href="/images">
          <a>
            <div
              style={{
                position: "relative",
                paddingTop: "56.25%",
              }}
            >
              <iframe
                src="https://iframe.mediadelivery.net/embed/58244/7f35090f-b5ab-4676-93e3-e9b01b862aba?autoplay=false&preload=false&muted=true"
                loading="lazy"
                className="videoThumbnail"
                style={{
                  border: "none",
                  position: "absolute",
                  top: 0,
                  height: "100%",
                  width: "100%",
                  borderRadius: "16px",
                }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen={false}
              />
            </div>
          </a>
        </Link>
        <div className="w-full">
          <div
            style={{
              position: "relative",
              paddingTop: "56.25%",
            }}
          >
            <iframe
              src="https://iframe.mediadelivery.net/embed/58244/7398f2df-4520-402c-8483-461a3ab3c965?autoplay=false&preload=false&muted=true"
              loading="lazy"
              className="videoThumbnail"
              style={{
                border: "none",
                position: "absolute",
                top: 0,
                height: "100%",
                width: "100%",
                borderRadius: "16px",
              }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen={false}
            />
          </div>
        </div>
        <div className="w-full"></div>
      </div>
    </main>
  )
}

export default Videos
