import Link from "next/link"
import Image from "./Image"
import Video from "./Video"

interface ListProps {
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

const List: React.FC<ListProps> = ({ onScrollData }) => {
  return (
    <div className="asset-list">
      {onScrollData
        ? onScrollData?.hits
            ?.map((item) => {
              if (item.type) {
                switch (item?.type) {
                  case "image": {
                    return (
                      <Link
                        key={item.id}
                        href={`${item.genre}/${item.album}/${item.id}`}
                      >
                        <a className="inline-block mb-[16px]">
                          <Image data={item} alt={item.title} />
                        </a>
                      </Link>
                    )
                  }
                  case "video":
                    return (
                      <Link
                        key={item.id}
                        href={`${item.genre}/${item.album}/${item.id}`}
                      >
                        <a className="inline-block mb-[16px]">
                          <Video data={item} />
                        </a>
                      </Link>
                    )

                  case "360": {
                    // TODO:
                    return null
                  }
                  case "audio": {
                    // TODO:
                    return null
                  }
                  default: {
                    return null
                  }
                }
              }
            })
            .filter(Boolean)
        : null}
      <div id="homepage-list-end" />
    </div>
  )
}
export default List
