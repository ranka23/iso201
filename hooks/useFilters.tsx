import React, { useReducer, useContext, useRef } from "react"

type Actions = "SET_FILTER" | "CLEAR_ALL_FILTERS"
type ProviderProps = { children: React.ReactNode }
interface FilterState extends PopulateFilters {}

type State = {
  filters: FilterState
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
  filters: {
    fps: [],
    scale: [],
    type: [],
    views: 0,
    album: [],
    duration: 0,
    free: false,
    genre: [],
    location: "",
    premium: false,
  },
}

const reducer = (state: State, action: Action<keyof State>): Partial<State> => {
  switch (action.type) {
    case "SET_FILTER": {
      return {
        ...state,
        filters: action.payload,
      }
    }
    case "CLEAR_ALL_FILTERS": {
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
const FiltersProvider = Provider

function useFilters(): ContextInterface {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useFilters must be used within a Provider")
  }
  return {
    state: context.state,
    dispatch: context.dispatch,
  }
}

export { FiltersProvider, useFilters }
