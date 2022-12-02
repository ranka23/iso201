import Image from "next/image"
import Search from "./Search"
import Link from "next/link"
import SocialMedia from "./SocialMedia"
import LoginSubscribe from "./LoginSubscribe"
import Links from "./Links"
import logo from "public/logo.png"
import FilterButton from "./FilterButton"

const NavBar = () => {
  return (
    <div className="fixed top-0 right-0 left-0 z-20 bg-white p-3 flex shadow-sm items-center justify-between">
      <div className="flex grow items-center">
        <Link href={"/"} passHref>
          <a className="flex items-center">
            <Image objectFit="contain" alt="iso201 logo" src={logo} />
          </a>
        </Link>
        <FilterButton />
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
