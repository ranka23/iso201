import Link from "next/link"
import SocialMedia from "../components/NavBar/SocialMedia"

const FourOFour = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-9xl font-bold">404</h2>
      <p className="text-lg font-medium max-w-xs text-center mb-4">
        The page has been removed, had it&rsquo;s name
        changed or is unavailable
      </p>
      <Link passHref href="/">
        <a className="py-3 px-4 border border-black font-bold mb-4">Go back to Homepage</a>
      </Link>
      <div className="flex items-center justify-between"><SocialMedia /></div>
    </div>
  )
}

export default FourOFour
