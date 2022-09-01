import Link from "next/link"
import SocialMedia from "../components/NavBar/SocialMedia"

const FiveOFive = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-9xl font-bold">500</h2>
      <p className="text-lg font-medium max-w-xs text-center mb-4">
        There&apos;s been an error on our end. Please retry after sometime.
      </p>
      <Link href="/">
        <a className="py-3 px-4 border border-black font-bold mb-4">Go back to Homepage</a>
      </Link>
      <div className="flex items-center justify-between"><SocialMedia /></div>
    </div>
  )
}

export default FiveOFive
