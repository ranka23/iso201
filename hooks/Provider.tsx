import { UIProvider } from "./useUI"
import { FiltersProvider } from "./useFilters"

interface Props {
  children: React.ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <UIProvider>
      <FiltersProvider>{children}</FiltersProvider>
    </UIProvider>
  )
}

export default Provider
