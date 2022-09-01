import React, { useEffect, useState } from "react"
import { useError } from "hooks/useError"
import close from "public/icons/close.svg"
import error from "public/icons/error.svg"
import Icon from "widgets/Icon/Icon"
import MountUnMount from "widgets/Animated/MountUnMount"

const ErrorNotification = ({
  children,
}: {
  children: React.PropsWithChildren
}) => {
  const {
    state: {
      error: { code, message },
    },
    dispatch,
  } = useError()

  const [isVisible, setIsVisible] = useState(false)

  const handleOnClose = () => {
    setTimeout(() => {
      dispatch({ type: "CLEAR_ERROR" })
    }, 500)
    setIsVisible(false)
  }

  useEffect(() => {
    if (message) {
      setIsVisible(true)
    }
  }, [message])

  return (
    <>
      <MountUnMount orientation="horizontal" isVisible={isVisible}>
        <div className="z-9999 flex flex-col max-w-[300px] bg-white absolute right-10 top-10 shadow-lg rounded-lg py-4 px-6">
          <div className="flex items-center justify-between pb-3">
            <span className="flex items-center text-xl font-bold text-red-500">
              <Icon className="mr-3" width={24} height={24} src={error} /> Error
            </span>
            <Icon
              className="self-end"
              width={24}
              height={24}
              onClick={handleOnClose}
              src={close}
            />
          </div>
          <div className="flex items-center">
            <span className="text-red-500 text-md font-medium">{message}</span>
          </div>
        </div>
      </MountUnMount>
      {children}
    </>
  )
}

export default ErrorNotification
