import ListWithFilters from "components/pages/ListWithFilters/ListWithFilters"
import { getThumbnailData, populateFilter } from "controller/assets"
import { GetServerSidePropsContext } from "next"
import Page from "components/pages/Page/Page"

const Album: React.FC<PageProps> = ({ list, head }) => {
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
  const filters = await populateFilter("album")
  const data = await getThumbnailData({
    genre: context?.params?.genre as string,
    album: context?.params?.album as string,
    operator: "AND",
  })
  return {
    props: {
      head: {
        title:
          (context?.params?.genre as string).charAt(0).toUpperCase() +
          (context?.params?.genre as string).slice(1) +
          " and " +
          (context?.params?.album as string).charAt(0).toUpperCase() +
          (context?.params?.album as string).slice(1) +
          " - Stock Footage" +
          " - iso201.com",
        description: `Free and Premium Stock footage of ${context?.params?.genre} and ${context?.params?.album} for YouTubers, Instagrammers, Influencers, Editors, marketers, advertisers`,
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

export default Album
