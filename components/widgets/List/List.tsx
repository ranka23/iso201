import css from "./index.module.css"
import { useMemo } from "react"
import AssetThumbnail from "../AssetThumbnail/AssetThumbnail"

interface ListProps {
  onScrollData: ListData
}

const List: React.FC<ListProps> = ({ onScrollData }) => {
  const data = useMemo(() => {
    const a: Array<ListDataHits> = []
    const b: Array<ListDataHits> = []
    const c: Array<ListDataHits> = []
    if (onScrollData?.hits?.length) {
      let pause = false
      let turn = 1
      onScrollData?.hits?.forEach((item) => {
        pause = false
        if (turn === 1 && !pause) {
          a.push(item)
          pause = true
          turn = 2
        }
        if (turn === 2 && !pause) {
          b.push(item)
          turn = 3
          pause = true
        }
        if (turn === 3 && !pause) {
          c.push(item)
          turn = 1
          pause = true
        }
      })
    }
    return {
      a,
      b,
      c,
    }
  }, [onScrollData])

  return (
    <div className={css.container}>
      <div className={css.list}>
        {data.a && data.a.length > 0 ? (
          <div className={`${css.column} ${css.column_1}`}>
            {data.a.map((item) => (
              <AssetThumbnail key={item.id} item={item} />
            ))}
          </div>
        ) : null}
        {data.b && data.b.length > 0 ? (
          <div className={`${css.column} ${css.column_2}`}>
            {data.b.map((item) => (
              <AssetThumbnail key={item.id} item={item} />
            ))}
          </div>
        ) : null}
        {data.c && data.c.length > 0 ? (
          <div className={`${css.column} ${css.column_3}`}>
            {data.c.map((item) => (
              <AssetThumbnail key={item.id} item={item} />
            ))}
          </div>
        ) : null}
      </div>
      <div id="asset-list-end" />
    </div>
  )
}
export default List
