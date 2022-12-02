import Filter from "components/Filter/Filter"
import List from "components/widgets/List/List"
import { stat } from "fs"
import { useUI } from "hooks/useUI"
import { useEffect, useMemo, useRef } from "react"
import css from "./index.module.css"

interface Props {
  filters: PopulateFilters
  data: ListData
  showFilters: boolean
  showFiltersInNav: boolean
  title?: string
  caption?: string
}

const ListWithFilters: React.FC<Props> = ({
  filters,
  data,
  showFilters = false,
  showFiltersInNav = true,
  title,
  caption,
}) => {
  const { state, dispatch } = useUI()
  const showFilter = useMemo(() => state.ui.showFilters, [state])

  useEffect(() => {
    dispatch({
      type: "SET_UI",
      payload: {
        ...state.ui,
        showFilters,
        showFiltersInNav,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${css.container}`}>
      <div className={css.filters}>
        {showFilter ? <Filter filters={filters} /> : null}
      </div>
      <div className={css.list}>
        {title ? (
          <h2 className="text-center mt-16 text-4xl font-bold">{title}</h2>
        ) : null}
        {caption ? (
          <p className="text-center mt-1 mb-5 font-medium text-lg">{caption}</p>
        ) : null}
        <List onScrollData={data} />
      </div>
    </div>
  )
}

export default ListWithFilters
