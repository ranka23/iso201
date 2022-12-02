import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styles from "styles/Home.module.css"
import { useFilters } from "../../../hooks/useFilters"
import { useUI } from "../../../hooks/useUI"
import Hero from "../Hero/Hero"
import ListWithFilters from "../ListWithFilters/ListWithFilters"

const Page: React.FC<PageProps> = ({ hero, list, head, filters }) => {
  const { pathname } = useRouter()
  const { dispatch: uiDispatch } = useUI()
  const { dispatch: filtersDispatch } = useFilters()

  useEffect(() => {
    if (pathname) {
      filtersDispatch({
        type: "CLEAR_ALL_FILTERS",
      })
      uiDispatch({
        type: "RESET_UI",
      })
    }
  }, [filtersDispatch, pathname, uiDispatch])

  return (
    <div className="relative">
      {head ? (
        <Head>
          <title>{head.title}</title>
          <meta name="description" content={head.description} />
        </Head>
      ) : null}
      <main>
        {hero ? (
          <Hero
            bgURL={hero.image}
            topHeader={hero.topHeader}
            description={hero.description}
            largeHeader={hero.largeHeader}
          />
        ) : null}
        <div id="list-start" className="sticky top-[-60px]" />
        <ListWithFilters
          showFilters={filters?.showFilters ?? false}
          showFiltersInNav={filters?.showFiltersInNav ?? true}
          data={list.data}
          filters={list.filters}
          title={list.header.title}
          caption={list.header.caption}
        />
      </main>
    </div>
  )
}

export default Page
