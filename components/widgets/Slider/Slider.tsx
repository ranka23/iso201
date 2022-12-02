import { useCallback, useState } from "react"
import Slider from "react-rangeslider"

interface RangeSliderProps {
  name: string
  max: number
  min?: number
  onChange: (value: number, name: string) => void
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  name,
  max = 0,
  min = 0,
  onChange,
}) => {
  const [value, setValue] = useState(0)
  const handleSliderChange = useCallback(
    (val: number) => {
      onChange(value, name)
    },
    [name, onChange, value]
  )

  const handleOnChange = useCallback((val: number) => {
    setValue(val)
  }, [])

  return (
    <div>
      <Slider
        value={value}
        onChange={handleOnChange}
        onChangeComplete={handleSliderChange}
        max={max}
        min={min}
      />
    </div>
  )
}

export default RangeSlider
