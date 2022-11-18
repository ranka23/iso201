import type { NextPage } from "next"
import styles from "styles/Home.module.css"
import Hero from "components/pages/Home/Hero/Hero"
import { getSearch } from "../controller/assets"
import List from "../components/widgets/List/List"


interface Props {
  hero: {
    image: string
    topHeader: string
    largeHeader: string
    description: string
  }
  onScrollData: {
    hits: Array<{
      id: number
      thumbnail: string
      type: AssetType
      scale: [number, number]
      title: string
      poster?: string
      genre: string
      album: string
    }> | null
    total: number
  }
}

const Home: NextPage<Props> = ({ hero, onScrollData }: Props) => {
  return (
    <div className={styles.container}>
      <main>
        <Hero
          bgURL={hero.image}
          topHeader={hero.topHeader}
          description={hero.description}
          largeHeader={hero.largeHeader}
        />
        <div className="mt-12"><List onScrollData={onScrollData} /></div>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const homepage = await getSearch({
    sort: {
      keywords: [
        {
          fieldName: "rating",
          order: "desc",
        },
        {
          fieldName: "created",
          order: "desc",
        },
        {
          fieldName: "likes",
          order: "desc",
        },
        {
          fieldName: "downloads",
          order: "desc",
        },
        {
          fieldName: "views",
          order: "desc",
        },
      ],
      from: 0,
      size: 100,
    },
    provide: ["thumbnail", "type", "id", "scale", "title", "poster", "genre", "album"],
  })

  return {
    props: {
      hero: {
        description:
          "4K and HD videos for your YouTube channel, social media and more...",
        image: "/hero.webp",
        largeHeader: "Content for Creators",
        topHeader: "iso201",
      },
      onScrollData: {
        total: homepage?.hits.total,
        hits: homepage?.hits.hits.map((item) => item._source),
      },
    },
  }
}

export default Home
