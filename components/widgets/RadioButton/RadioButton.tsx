import { useState } from "react"

interface Props {
  placeholder: string
  name: keyof PopulateFilters
  onClick: (data: RadioButtonCallback) => void
  isRadio?: boolean
  isActive?: boolean
}

const RadioButton: React.FC<Props> = ({
  placeholder,
  name,
  onClick,
  isRadio = false,
  isActive,
}) => {
  const [active, setActive] = useState(false)

  const handleOnClick = () => {
    onClick({
      isChecked: !active,
      name,
      placeholder,
    })
    if (!isRadio) {
      setActive(!active)
    }
  }
  return (
    <div>
      <button
        className={`truncate text-[#333] text-sm font-medium w-full border rounded transition-all ${
          active || isActive ? "border-black" : "border-neutral"
        } py-1 px-2`}
        onClick={handleOnClick}
      >
        {placeholder}
      </button>
    </div>
  )
}

export default RadioButton
