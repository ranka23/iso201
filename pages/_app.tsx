import "styles/globals.css"
import type { AppProps } from "next/app"
import NavBar from "components/NavBar"
import Footer from "components/Footer/Footer"
import Head from "next/head"
import { useRouter } from "next/router"
import { useMemo } from "react"
import ErrorHandler from "components/Error"

function MyApp({ Component, pageProps }: AppProps) {
  const { route } = useRouter()

  const showRoute = useMemo(() => {
    if (["subscribe", "404", "500"].some((value) => route.includes(value))) {
      return false
    }
    return true
  }, [route])
  return (
    <>
      <Head>
        <title>4K and HD Videos | iso201</title>
        <meta
          name="description"
          content="Stock videos for YouTube Channel, Instagram, TikTok, Facebook and more"
        />
      </Head>
      {showRoute ? <NavBar /> : null}
      <ErrorHandler>
        <Component {...pageProps} />
      </ErrorHandler>
      <Footer />
    </>
  )
}

export default MyApp
