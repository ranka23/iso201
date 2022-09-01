import { ErrorProvider } from "../../hooks/useError"
import ErrorBoundary from "./ErrorBoundary"
import ErrorNotification from "./ErrorNotification"

const ErrorHandler = ({ children = <></>}) => {
  return (
    <ErrorProvider>
      <ErrorNotification>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </ErrorNotification>
    </ErrorProvider>
  )
}

export default ErrorHandler
