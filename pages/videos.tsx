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
      {/* TODO: GIFS maps over here */}
      </div>
    </main>
  )
}

export default Videos
