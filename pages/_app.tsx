import "styles/globals.css"
import "react-loading-skeleton/dist/skeleton.css"
import type { AppProps } from "next/app"
import NavBar from "components/NavBar"
import Footer from "components/Footer/Footer"
import Head from "next/head"
import { useRouter } from "next/router"
import { useMemo } from "react"
import ErrorHandler from "components/Error"
import Provider from "hooks/Provider"

function MyApp({ Component, pageProps }: AppProps) {
  const { route } = useRouter()

  const showNavbar = useMemo(() => {
    if (["subscribe", "404", "500"].some((value) => route.includes(value))) {
      return false
    }
    return true
  }, [route])

  return (
    <>
      <Head>
        <title>4K videos and images - iso201.com</title>
        <meta
          name="description"
          content="Stock images and videos for YouTube Channel, Instagram, TikTok, Facebook and more"
        />
      </Head>
      <Provider>
        {showNavbar ? <NavBar /> : null}
        <div className="pt-[60px]">
          <ErrorHandler>
            <Component {...pageProps} />
          </ErrorHandler>
        </div>
        <Footer />
      </Provider>
    </>
  )
}

export default MyApp
