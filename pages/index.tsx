import { getThumbnailData, populateFilter } from "controller/assets"
import type { NextPage } from "next"
import log from "utils/logger"
import Page from "../components/pages/Page/Page"

const Home: NextPage<PageProps> = ({ hero, list }) => {
  return <Page hero={hero} list={list} />
}

export const getServerSideProps = async () => {
  try {
    const data = await getThumbnailData()
    const filters = await populateFilter()
    return {
      props: {
        hero: {
          description: "4K & Hi-res resources for the creative mind.",
          image: "/hero.webp",
          largeHeader: "Content for Creators",
          topHeader: "iso201",
        },
        list: {
          header: {
            title: "Unlimited downloads & usage",
            caption:
              "Handpicked, 4K stock footage at prices cheaper than Netflix",
          },
          data,
          filters,
        },
      },
    }
  } catch (error: any) {
    log.error("INDEX PAGE SSR ERROR: ", error)
  }
}

export default Home
