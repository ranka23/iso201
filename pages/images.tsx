import Head from "next/head"
import Hero from "../components/pages/Home/Hero/Hero"

const Images = () => {
  return (
    <>
      <Head>
        <title>High res Images for Youtube | iso201</title>
        <meta
          name="description"
          content="Stock images for YouTube Channel, Instagram, TikTok, Facebook and more"
        />
      </Head>
      <main>
        <Hero
          bgURL="/image.webp"
          description="High res Images for your youtube channel, social media and more..."
          largeHeader="Images for Creators"
          topHeader="iso201"
        />
      </main>
    </>
  )
}

export default Images
