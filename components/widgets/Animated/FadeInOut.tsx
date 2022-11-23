import { animated, useSpring } from "@react-spring/web"
import { ReactNode, useCallback, useEffect, useState } from "react"

interface Props {
  isVisible: boolean
  children: ReactNode
  isTop?: boolean
  y?: number
  x?: number
}

const FadeInOut: React.FC<Props> = ({
  isVisible,
  children,
  isTop = false,
  y = 24,
  x,
}) => {
  const [display, setDisplay] = useState("none")

  useEffect(() => {
    if (isVisible) {
      setDisplay("block")
    } else {
      setTimeout(() => {
        setDisplay("none")
      }, 700)
    }
  }, [isVisible])

  const values: Record<string, string | number> = {
    opacity: isVisible ? 1 : 0,
    display,
  }

  if (isTop && isVisible) {
    values.zIndex = 99999
  }
  if (x) {
    values.x = isVisible ? 0 : x
  }
  if (y || y === 0) {
    values.y = isVisible ? 0 : y
  }
  const styles = useSpring(values)

  return <animated.div style={styles}>{children}</animated.div>
}

export default FadeInOut
