import { createQROptions } from "@solana/pay"
import QRCodeStyling from "@solana/qr-code-styling"
import { useEffect, useMemo, useRef, useState } from "react"

export const QRCode = ({ url }: { url: string }) => {
  const [size, setSize] = useState(() =>
    typeof window === "undefined"
      ? 420
      : Math.min(window.screen.availWidth - 48, 420)
  )
  useEffect(() => {
    const listener = () => setSize(Math.min(window.screen.availWidth - 48, 420))

    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [])

  const options = useMemo(
    () => createQROptions(url, size, "transparent", "#2a2a2a"),
    [url, size]
  )

  const qr = useMemo(() => new QRCodeStyling(), [])
  useEffect(() => qr.update(options), [qr, options])

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      qr.append(ref.current)
    }
  }, [ref, qr])

  return <div ref={ref} className="rounded-2xl" />
}
