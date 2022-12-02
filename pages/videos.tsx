import { getThumbnailData, populateFilter } from "controller/assets"
import log from "utils/logger"
import Page from "../components/pages/Page/Page"

const Videos: React.FC<PageProps> = ({ hero, list, head }) => {
  return <Page list={list} head={head} hero={hero} />
}

export const getServerSideProps = async () => {
  try {
    const data = await getThumbnailData({
      type: "video",
    })
    const filters = await populateFilter()
    return {
      props: {
        head: {
          title: "4K videos for Creators - iso201.com",
          description:
            "Free and premium videos for YouTubers, Influencers, Editors, Designers and more",
        },
        hero: {
          description: "4K videos to bring that story to life.",
          image: "/video.webp",
          largeHeader: "Content for Creators",
          topHeader: "iso201",
        },
        list: {
          header: {
            title: "Amazing 4K Stock Videos",
            caption: "Unlimited downloads and usage at an amazing price.",
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

export default Videos
