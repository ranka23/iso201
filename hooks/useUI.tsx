import React, { useReducer, useContext } from "react"

type Actions = "SET_UI" | "RESET_UI"
type ProviderProps = { children: React.ReactNode }
interface UIState {
  showFiltersInNav: boolean
  showFilters: boolean
}

type State = {
  ui: UIState
}

interface Action<T extends keyof State> {
  type: Actions
  payload?: State[T]
}
type Dispatch = (action: Action<keyof State>) => void

interface ContextInterface {
  state: State
  dispatch: Dispatch
}

const Context = React.createContext<ContextInterface | undefined>(undefined)

const initialState: State = {
  ui: {
    showFiltersInNav: true,
    showFilters: false,
  },
}

const reducer = (state: State, action: Action<keyof State>): Partial<State> => {
  switch (action.type) {
    case "SET_UI": {
      return {
        ...state,
        ui: action.payload,
      }
    }
    case "RESET_UI": {
      return initialState
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export const Provider = ({ children }: ProviderProps): JSX.Element => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Context.Provider value={value}>{children}</Context.Provider>
}
const UIProvider = Provider

function useUI(): ContextInterface {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useUI must be used within a Provider")
  }
  return context
}

export { UIProvider, useUI }
