import { getThumbnailData, populateFilter } from "controller/assets"
import { GetServerSidePropsContext } from "next"
import Page from "components/pages/Page/Page"

const Genre: React.FC<PageProps> = ({ list, head }) => {
  return (
    <Page
      list={list}
      head={head}
      filters={{
        showFilters: true,
        showFiltersInNav: true,
      }}
    />
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const genre = context?.params?.genre as string
  const filters = await populateFilter("genre", genre)
  const data = await getThumbnailData({
    genre: genre,
  })
  return {
    props: {
      head: {
        title:
          genre.charAt(0).toUpperCase() +
          genre.slice(1) +
          " - Stock Footage" +
          " - iso201.com",
        description: `Free and Premium Stock footage of ${genre} for YouTubers, Instagrammers, Influencers, Editors, marketers, advertisers`,
      },
      list: {
        header: {
          title: "",
          caption: "",
        },
        filters,
        data,
      },
    },
  }
}

export default Genre
