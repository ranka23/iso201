import Link from "next/link"
import Image from "./Image"
import Video from "./Video"
import css from "./index.module.css"

const Wrapper = ({
  withLink = true,
  item = {} as ListDataHits,
  children = <></>,
}) => {
  if (!withLink) {
    return <div className={css.item}>{children}</div>
  }
  return (
    <div className={css.item}>
      <Link
        passHref
        key={item?.id}
        href={`/${item?.genre}/${item?.album}/${item?.id}`}
      >
        <a onClick={(e) => e.stopPropagation()}>{children}</a>
      </Link>
    </div>
  )
}

const AssetThumbnail = ({
  item = {} as ListDataHits,
  showIcon = true,
  withLink = true,
}) => {
  if (item.type) {
    switch (item?.type) {
      case "image": {
        return (
          <Wrapper withLink={withLink} item={item}>
            <Image data={item} alt={item.title} />
          </Wrapper>
        )
      }
      case "video":
        return (
          <Wrapper withLink={withLink} item={item}>
            <Video data={item} showIcon={showIcon} />
          </Wrapper>
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
