import Icon from "components/widgets/Icon/Icon"
import filter from "public/icons/filter.svg"
import { useUI } from "hooks/useUI"
import { useCallback } from "react"

const FilterButton = () => {
  const {
    state: { ui },
    dispatch,
  } = useUI()

  const handleOnClick = useCallback(() => {
    dispatch({
      type: "SET_UI",
      payload: {
        ...ui,
        showFilters: !ui.showFilters,
      },
    })
    document.getElementById("list-start")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, [dispatch, ui])

  if (!ui.showFiltersInNav) {
    return null
  }

  return (
    <button
      onClick={handleOnClick}
      className="ml-6 bg-gray-100 px-3 py-2 rounded-lg"
    >
      <span className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
        <Icon src={filter} width={16} height={16} />
        Filters
      </span>
    </button>
  )
}

export default FilterButton
