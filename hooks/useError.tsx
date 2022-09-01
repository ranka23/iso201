import dayjs from "dayjs"
import React, { useReducer, useContext } from "react"

type Actions = "SET_ERROR" | "CLEAR_ERROR"
type ProviderProps = { children: React.ReactNode }
interface ErrorState {
  code: string
  message: string
}

type State = {
  error: ErrorState
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
  error: {
    code: "",
    message: "",
  },
}

const reducer = (state: State, action: Action<keyof State>): Partial<State> => {
  switch (action.type) {
    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload,
      }
    }
    case "CLEAR_ERROR": {
      return {
        ...state,
        error: {
          code: "",
          message: "",
        },
      }
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
const ErrorProvider = Provider

function useError(): ContextInterface {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useError must be used within a Provider")
  }
  return context
}

export { ErrorProvider, useError }
