import Icon from "widgets/Icon/Icon"
import googleLogo from "public/google-logo.svg"
import PriceAndInfo from "components/pages/Subscribe/PriceAndInfo"
import getGoogleOAuthURL from "utils/getGoogleUri"

interface Props {
  price: number
  discountCaption: string
  description: Array<string>
}

const Login: React.FC<Props> = ({ description, discountCaption, price }) => {
  return (
    <main>
      <div className="md:columns-2">
        <div className="bg-black h-screen">
          <div className="flex items-center justify-center flex-col h-full text-white">
            <div>
              <h2 className="text-left text-white font-semibold text-5xl mb-6 opacity-80">
                Not a pro user?
              </h2>
              <div>
                <PriceAndInfo
                  amount={{
                    currency: "$",
                    price,
                  }}
                  description={description}
                  discountCaption={discountCaption}
                  provider="solana"
                />
              </div>
              <a href={getGoogleOAuthURL()} className="flex items-center justify-center rounded bg-white text-black w-[320px] pl-4 pr-6 py-4 shadow-login hover:shadow-lg transition-shadow cursor-pointer">
                <span className="text-lg font-semibold pl-3">Subscribe to Pro</span>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col bg-white h-screen pb-[12rem] max-w-[320px] m-auto">
            <h4 className="text-5xl font-bold mb-4">Log in to iso201</h4>
            <span className="mb-4 text-center">
              Welcome back! Login with your Google credentials to access your pro
              account.
            </span>
            <a href={getGoogleOAuthURL()} className="flex items-center justify-center rounded w-full pl-4 pr-6 py-4 shadow-login hover:shadow-lg transition-shadow cursor-pointer">
              <Icon src={googleLogo} width={24} height={24} />
              <span className="text-lg pl-3">Sign in with Google</span>
            </a>
            </div>
        </div>
      </div>
    </main>
  )
}

export const getStaticProps = () => {
  const description = [
    "Unlimited downloads",
    "4K and HD Videos",
    "High-res Images",
    "Complete usage rights",
    "For Youtube channel",
    "For social media accounts",
    "For designs, ads or marketing",
  ]

  const props = {
    props: {
      price: 30,
      discountCaption: "50% early bird discount",
      description,
    },
  }

  return props
}

export default Login
