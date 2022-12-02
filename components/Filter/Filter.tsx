import RadioButton from "components/widgets/RadioButton/RadioButton"
import RangeSlider from "components/widgets/Slider/Slider"
import Switch from "components/widgets/Switch/Switch"
import { useFilters } from "hooks/useFilters"
import album from "public/icons/album.svg"
import assetType from "public/icons/asset-type.svg"
import collapse from "public/icons/collapse.svg"
import duration from "public/icons/duration.svg"
import filter from "public/icons/filter.svg"
import fps from "public/icons/fps.svg"
import genre from "public/icons/genre.svg"
import location from "public/icons/location.svg"
import scale from "public/icons/scale.svg"
import views from "public/icons/view.svg"
import React, { useCallback, useMemo } from "react"
import { useUI } from "../../hooks/useUI"
import Icon from "../widgets/Icon/Icon"

interface Props {
  filters: PopulateFilters
}

const Filter: React.FC<Props> = ({ filters }) => {
  const {
    dispatch,
    state: { filters: selectedFilter },
  } = useFilters()

  const {
    dispatch: uiDispatch,
    state: { ui },
  } = useUI()

  const handleFiltersClicked = useCallback(
    ({ placeholder, name }: RadioButtonCallback) => {
      const isRadio = ["genre", "album"].some((item) => item === name)
      const oldFilters = { ...selectedFilter }
      if (!Array.isArray(oldFilters?.[name])) {
        return
      }
      const checked = oldFilters?.[name]
        ? // @ts-ignore
          oldFilters?.[name].find((item) => item === placeholder)
        : false
      if (!checked) {
        if (!oldFilters?.[name] || isRadio) {
          oldFilters[name] = [] as never
        }
        // @ts-ignore
        oldFilters[name].push(placeholder)
        dispatch({
          type: "SET_FILTER",
          payload: oldFilters,
        })
      } else {
        // @ts-ignore
        const setArray = oldFilters?.[name].filter(
          // @ts-ignore
          (item) => item !== placeholder
        )
        if (setArray.length) {
          oldFilters[name] = setArray as never
        } else {
          oldFilters[name] = [] as never
        }
        dispatch({
          type: "SET_FILTER",
          payload: oldFilters,
        })
      }
    },
    [dispatch, selectedFilter]
  )

  const keys = useMemo(() => {
    return Object.keys(filters).filter(
      (item) => !["views", "duration", "likes"].some((i) => i === item)
    ) as Array<keyof PopulateFilters>
  }, [filters])

  const checkActiveRadioFilters = useCallback(
    (key: string, item: string | number) => {
      // @ts-ignore
      const doesExists = selectedFilter?.[key as keyof PopulateFilters]?.find(
        (i: string | number) => i === item
      )
      return !!doesExists
    },
    [selectedFilter]
  )

  const handleLocationTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      dispatch({
        type: "SET_FILTER",
        payload: {
          ...selectedFilter,
          location: value,
        },
      })
    },
    [dispatch, selectedFilter]
  )

  const handleSliderChange = useCallback(
    (value: number, name: string) => {
      dispatch({
        type: "SET_FILTER",
        payload: {
          ...selectedFilter,
          [name]: value,
        },
      })
    },
    [dispatch, selectedFilter]
  )

  const formatText = useCallback((data: [number, number] | string | number) => {
    if (Array.isArray(data)) {
      return `${data[0]} x ${data[1]}`
    }

    if (typeof data === "string") {
      return data.replace("-", " ").trim()
    }

    return data.toString()
  }, [])

  const handleCollapse = useCallback(() => {
    uiDispatch({
      type: "SET_UI",
      payload: {
        ...ui,
        showFilters: false,
      },
    })
  }, [ui, uiDispatch])

  return (
    <div className="">
      <div className="p-6 border-r bg-white max-w-[258px] sticky top-60 z-10 opacity-85">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon src={filter} width={25} height={25} />
            <p className="ml-3 text-2xl text-[#444] font-semibold">FILTERS</p>
          </div>
          <button onClick={handleCollapse}>
            <Icon src={collapse} width={25} height={25} />
          </button>
        </div>
        <div className="mt-10">
          <div className="flex items-center mb-2">
            <Icon src={location} width={14} height={14} />
            <p className="text-sm font-medium ml-2">LOCATION</p>
          </div>
          <input
            className="border max-w-[215px] py-2 px-3 rounded-md"
            type={"search"}
            placeholder={"Enter place name"}
            onChange={handleLocationTextChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 overflow-auto max-h-[228px]">
          <div className="flex items-center mt-10 mb-2">
            <Switch />
            <p className="ml-2 text-sm font-medium">FREE</p>
          </div>
          <div className="flex items-center mt-10 mb-2">
            <Switch />
            <p className="ml-2 text-sm font-medium">PREMIUM</p>
          </div>
        </div>
        {keys.map((key) => {
          let icon = assetType
  
          if (key === "scale") {
            icon = scale
          } else if (key === "album") {
            icon = album
          } else if (key === "genre") {
            icon = genre
          } else if (key === "fps") {
            icon = fps
          }
  
          return (
            <div key={key}>
              <div className="flex items-center mt-8 mb-2">
                <Icon src={icon} width={14} height={14} />
                <p className="text-sm font-medium ml-2">
                  {key === "scale" ? "RESOLUTION" : key.toUpperCase()}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 overflow-auto max-h-[228px]">
                {(filters[key as keyof PopulateFilters] as Array<string>).map(
                  (item) => (
                    <RadioButton
                      key={item}
                      onClick={handleFiltersClicked}
                      name={key}
                      placeholder={formatText(item)}
                      isRadio={["genre", "album"].some((item) => item === key)}
                      isActive={
                        ["genre", "album"].some((item) => item === key)
                          ? checkActiveRadioFilters(key, item)
                          : undefined
                      }
                    />
                  )
                )}
              </div>
            </div>
          )
        })}
        <div className="mt-10">
          <div className="flex items-center mb-2">
            <Icon src={views} width={14} height={14} />
            <p className="text-sm font-medium ml-2">
              VIEWS{" "}
              <span className="ml-1 font-xs text-[#aaa]">
                {" "}
                {`> ${selectedFilter.views}`}
              </span>
            </p>
          </div>
          <RangeSlider
            name="views"
            onChange={handleSliderChange}
            max={filters.views + 1}
            min={0}
          />
        </div>
        <div className="mt-10">
          <div className="flex items-center">
            <Icon src={duration} width={14} height={14} />
            <p className="text-sm font-medium ml-2">
              DURATION{" "}
              <span className="ml-1 font-xs text-[#aaa]">
                {" "}
                {`> ${selectedFilter.duration}`}
              </span>
            </p>
          </div>
          <RangeSlider
            name="duration"
            onChange={handleSliderChange}
            max={filters?.duration || 0}
            min={0}
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
