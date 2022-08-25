import Image from "next/image"
import Search from "./Search"
import Link from "next/link"
import SocialMedia from "./SocialMedia"
import LoginSubscribe from "./LoginSubscribe"
import Links from "./Links"
import logo from 'public/logo.png'

const NavBar = () => {
  return (
    <div className="p-3 flex items-center justify-between">
      <div className="flex grow items-center">
        <Link href={"/"}>
          <a className="flex items-center">
            <Image objectFit="contain" alt="iso201 logo" src={logo} />
          </a>
        </Link>
        <Search />
        <Links />
      </div>
      <div className="flex items-center">
        <LoginSubscribe />
        <SocialMedia />
      </div>
    </div>
  )
}

export default NavBar
