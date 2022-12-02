import AssetDetails from "components/Asset/AssetDetails"
import BunnyPlayer from "components/widgets/BunnyPlayer/BunnyPlayer"
import LargeImage from "components/widgets/LargeImage/LargeImage"
import { getSearch, getSimilar } from "controller/assets"
import { GetStaticPropsContext } from "next"
import AssetThumbnail from "components/widgets/AssetThumbnail/AssetThumbnail"
import BreadCrumb from "components/widgets/BreadCrumb/BreadCrumb"
import log from "utils/logger"
import css from "./index.module.css"
import Icon from "components/widgets/Icon/Icon"
import camcord from "public/icons/camcord.svg"
import Link from "next/link"
import { useEffect } from "react"
import { useUI } from "hooks/useUI"
import Head from "next/head"

interface Props {
  id: number
  isFree: boolean
  type: AssetType
  title: string
  uri: string
  tags: string[]
  scale: [number, number]
  fps: number
  mime: string
  likes: string
  views: string
  size: string
  duration: string
  description: string
  fname: string
  album: string
  genre: string
  similar: Array<ListDataHits>
  head: {
    title: string
    description: string
  }
}

const Asset: React.FC<Props> = ({
  head,
  id,
  uri,
  title,
  description,
  fps,
  type,
  size,
  mime,
  tags,
  scale,
  duration,
  fname,
  genre,
  album,
  isFree,
  similar,
}) => {
  const { dispatch, state } = useUI()
  useEffect(() => {
    dispatch({
      type: "SET_UI",
      payload: {
        ...state.ui,
        showFiltersInNav: false,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {head ? (
        <Head>
          <title>{head.title}</title>
          <meta name="description" content={head.description} />
        </Head>
      ) : null}
      <main>
        <div className={css.container}>
          <div>
            {type === "video" ? (
              <BunnyPlayer videoId={uri} id={id} />
            ) : (
              <LargeImage src={uri} alt={title} />
            )}
            <AssetDetails
              album={album}
              description={description}
              duration={duration}
              fname={fname}
              fps={fps}
              genre={genre}
              id={id}
              isFree={isFree}
              mime={mime}
              scale={scale}
              size={size}
              tags={tags}
              title={title}
              type={type}
            />
          </div>
          <div>
            {similar.map((item) => (
              <Link
                passHref
                key={item.id}
                href={`/${item.genre}/${item.album}/${item.id}`}
              >
                <a>
                  <div className="flex gap-2 mb-4 overflow-hidden">
                    <div className="min-w-[240px] max-w-[240px] min-h-[135px] max-h-[135px] overflow-hidden">
                      <AssetThumbnail
                        showIcon={false}
                        item={item}
                        withLink={false}
                      />
                    </div>
                    <div className="ml-2 pr-4">
                      <p className="font-medium text-lg opacity-90 mb-2 line-clamp-3">
                        {item.title}
                      </p>
                      {item.duration ? (
                        <div className="flex items-center">
                          <Icon
                            className="opacity-40"
                            src={camcord}
                            width={24}
                          />
                          <p className="bg-[#eee] text-sm rounded inline py-[2px] px-2 ml-2">
                            {item.duration}
                            {item.type === "video" ? " seconds" : ""}
                          </p>
                        </div>
                      ) : null}
                      <div className="mt-2">
                        <BreadCrumb
                          useButton
                          levels={[item.genre, item.album]}
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const assets = await getSearch({
      id: parseInt(context.params?.asset as string),
    })
    const similar = await getSimilar(context.params?.asset as string, [
      "id",
      "thumbnail",
      "title",
      "type",
      "scale",
      "poster",
      "genre",
      "album",
      "duration",
    ])
    const asset = assets?.hits.hits[0]?._source

    if (asset) {
      return {
        props: {
          head: {
            title: `${asset.title?.substring(0, 22)}... - iso201.com`,
            description: `4K and Hi-res Stock footage from ${asset.location}. ${asset.description}`,
          },
          id: asset.id,
          isFree: asset.free,
          type: asset.type,
          title: asset.title,
          uri: asset.type === "video" ? asset.uri : asset.poster,
          tags: asset.tags,
          scale: asset.scale,
          fps: asset.fps,
          mime: asset.mime,
          size: asset.size,
          duration: asset.duration,
          description: asset.description,
          fname: asset.fname,
          genre: asset.genre,
          album: asset.album,
          similar,
        },
      }
    } else {
      return {
        props: {},
      }
    }
  } catch (error: any) {
    log.error(
      `AssetID: ${context.params?.asset} getStaticProps for Asset Page: `,
      error
    )
  }
}

export default Asset
