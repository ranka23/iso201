import Image from "next/image"
import Search from "../Search/Search"

const NavBar = () => {
  return (
    <div className="px-6 py-4 flex items-center font-medium">
      <Image
        width={40}
        height={40}
        alt="logo"
        className=""
        src="/logo_120.png"
      />
      <Links />
      <Search />
    </div>
  )
}

export default NavBar

interface LinkProp {
  name: string
  href: string
}

const Links = () => {
  return (
    <>
      {links.map((link) => (
        <a
          className="text-white pl-6 hover:opacity-70 transition-opacity"
          key={link.href}
          href={link.href}
        >
          {link.name}
        </a>
      ))}
    </>
  )
}

const links = [
  {
    name: "Videos",
    href: "/videos",
  },
  {
    name: "Images",
    href: "/images",
  },
  {
    name: "Audio",
    href: "/audio",
  },
]
