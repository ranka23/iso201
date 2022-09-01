import Icon from "widgets/Icon/Icon"
import Link from "next/link"
import successIcon from "public/icons/success.svg"

const Success = () => {
  return (
    <div className="flex flex-col items-center my-6">
      <Icon src={successIcon} width={120} height={120} />
      <h4 className="font-bold text-4xl text-[#88CC2A]">Success</h4>
      <p className="mt-2 text-center">
        Congrats you are now a Pro user. Thank you for choosing us! <br></br>Wish you a pleasant day. 😊
      </p>
      <div className="flex items-center">
        <Link href={"/"}>
          <a className="text-white font-bold bg-black rounded py-3 px-4 mt-4 mr-4 hover:opacity-90 transition-opacity">
            Go to Homepage
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Success
