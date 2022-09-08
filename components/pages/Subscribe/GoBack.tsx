import Image from "next/image"
import Link from "next/link"

interface Props {
  href?: string
  title?: string
}

const GoBack: React.FC<Props> = ({
  href = "/account",
  title = "User Account",
}) => {
  return (
    <div className="opacity-60 hover:opacity-100">
      <Link href={href}>
        <span className="font-bold flex items-center cursor-pointer">
          <Image
            alt="back-icon"
            width={20}
            height={20}
            objectFit="contain"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABFklEQVRoge3YPUoDYRSG0TvaugRXYikq/hSCRrHRSlTcoRtwG2lMI1ikMApGj9Ug6sSMIeQjwz31EJ43kJlvEpFSSimllNKioIdHDHFeumcmOMPYlyFWS3f9C07w5rsnrJRuaw3HDSPGOC3d1hr28fpjxDsuSre1hr2GER+4Kt3WGnbx0jDiunRba9iZMOKmdFtr2J4w4rZ0W2vYwmjZR2ziWTl97E3rrKaM2IiIu4hYm9cXM6NBVVXrf12wPE/fKf4cUlXVfUQcRsRoMTmN+hFxOZdP0oUfe00Xbr81XXgg1nThiFLThUNjTReO8TWTX6x6pdv+TfOr7qB010z8/vNhOYdEROAIAzzgoHRPSimllFJKv3wCsoZ5WQ+iMHoAAAAASUVORK5CYII="
          />
          <span className="ml-1">{title}</span>
        </span>
      </Link>
    </div>
  )
}

export default GoBack
