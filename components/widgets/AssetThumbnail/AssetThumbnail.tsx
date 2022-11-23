import Link from "next/link"
import Image from "./Image"
import Video from "./Video"
import css from "./index.module.css"

const AssetThumbnail = ({
  item = {} as ScrollDataHits,
  link = true,
  showIcon = true,
}) => {
  if (item.type) {
    switch (item?.type) {
      case "image": {
        if (!link) {
          return (
            <div className={css.item}>
              <Image data={item} alt={item.title} />
            </div>
          )
        }
        return (
          <div className={css.item}>
            <Link key={item.id} href={`${item.genre}/${item.album}/${item.id}`}>
              <a>
                <Image data={item} alt={item.title} />
              </a>
            </Link>
          </div>
        )
      }
      case "video":
        if (!link) {
          return (
            <div className={css.item}>
              <Video data={item} showIcon={showIcon} />
            </div>
          )
        }
        return (
          <div className={css.item}>
            <Link key={item.id} href={`${item.genre}/${item.album}/${item.id}`}>
              <a>
                <Video data={item} showIcon={showIcon} />
              </a>
            </Link>
          </div>
        )

      case "360": {
        // TODO:
        return <></>
      }
      case "audio": {
        // TODO:
        return <></>
      }
      default: {
        return <></>
      }
    }
  }
  return <></>
}

export default AssetThumbnail
