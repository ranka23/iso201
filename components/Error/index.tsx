import { ErrorProvider } from "../../hooks/useError"
import ErrorBoundary from "./ErrorBoundary"
import ErrorNotification from "./ErrorNotification"
interface Props {
  children: React.ReactNode
}
const ErrorHandler: React.FC<Props> = ({ children }) => {
  return (
    <ErrorProvider>
      <ErrorNotification>
        {/* @ts-ignore */}
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </ErrorNotification>
    </ErrorProvider>
  )
}

export default ErrorHandler
