import Link from "next/link"

const Links = () => {
  return (
    <>
      {links.map((link) => (
        <Link passHref key={link.href} href={link.href}>
          <a className="mr-6 opacity-60 font-normal hover:opacity-100 transition-opacity">
            {link.name}
          </a>
        </Link>
      ))}
    </>
  )
}

export default Links

const links = [
  {
    name: "Videos",
    href: "/videos",
  },
  {
    name: "Images",
    href: "/images",
  },
]