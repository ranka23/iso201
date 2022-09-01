import { useTransition, animated } from "@react-spring/web"
import { ReactNode } from "react"

interface Props {
  isVisible: boolean
  children: ReactNode
  orientation?: "vertical" | "horizontal"
  horizontalDirection?: "leftToRight" | "rightToLeft"
}

const MountUnMount: React.FC<Props> = ({
  children,
  isVisible,
  orientation = "vertical",
  horizontalDirection = "rightToLeft"
}) => {
  let values: Record<string, any> = {
    from: { opacity: 0, y: 24 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 24 },
    exitBeforeEnter: true
  }

  if (orientation === "horizontal") {
    values = {
      from: { opacity: 0, x: 24 },
      enter: { opacity: 1, x: 0 },
      leave: { opacity: 0, x: 24 },
      exitBeforeEnter: true
    }
  }

  if (orientation === "horizontal" && horizontalDirection === "leftToRight") {
    values = {
      from: { opacity: 0, x: -24 },
      enter: { opacity: 1, x: 0 },
      leave: { opacity: 0, x: 24 },
      exitBeforeEnter: true
    }
  }

  const transitions = useTransition(isVisible, values)
  return transitions(
    (styles, item) =>
      item ? <animated.div style={styles}>{children}</animated.div> : ''
  )
}

export default MountUnMount
