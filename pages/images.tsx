import { getThumbnailData, populateFilter } from "controller/assets"
import log from "utils/logger"
import Page from "../components/pages/Page/Page"

const Images: React.FC<PageProps> = ({ list, hero, head }) => {
  return <Page list={list} head={head} hero={hero} />
}

export const getServerSideProps = async () => {
  try {
    const data = await getThumbnailData({
      type: "image",
    })
    const filters = await populateFilter()
    return {
      props: {
        head: {
          title: "Hi-res Images for Creators - iso201.com",
          description:
            "Free and premium images for YouTubers, Influencers, Editors, Designers and more",
        },
        hero: {
          description: "Hi-res Images for your next big project.",
          image: "/image.webp",
          largeHeader: "Content for Creators",
          topHeader: "iso201",
        },
        list: {
          header: {
            title: "Free & Premium Stock Images",
            caption: "Engage audiences with high quality images.",
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

export default Images
