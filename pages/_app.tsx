import "styles/globals.css"
import type { AppProps } from "next/app"
import NavBar from "components/NavBar/NavBar"
import Footer from "components/Footer/Footer"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Content for Creators - iso201</title>
        <meta
          name="description"
          content="Stock videos for YouTube Channel, Instagram, TikTok, Facebook and more"
        />
      </Head>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
