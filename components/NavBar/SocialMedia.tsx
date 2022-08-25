import Icon from "../widgets/Icon/Icon"
import facebook from "public/icons/facebook.svg"
import youtube from "public/icons/youtube.svg"
import instagram from "public/icons/instagram.svg"
import Link from "next/link"

const icons = [
  {
    src: youtube,
    href: "youtube.com/iso201.com",
  },
  {
    src: facebook,
    href: "facebook.com/iso201.com",
  },
  {
    src: instagram,
    href: "instagram.com/iso201.com",
  },
]

const SocialMedia = () => (
  <>
    {icons.map((icon) => (
      <Link key={icon.href} href={icon.href}>
        <a className="mr-3 opacity-60 hover:opacity-100 transition-opacity">
          <Icon src={icon.src} height={16} />
        </a>
      </Link>
    ))}
  </>
)

export default SocialMedia
