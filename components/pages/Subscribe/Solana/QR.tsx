import Loader from "widgets/Loader/Loader"
import { QRCode } from "components/pages/Subscribe/QRCode/QRCode"

interface Props {
  qr: string
  onClick: () => void
  showLoader: boolean
}

const QR: React.FC<Props> = ({ qr, onClick, showLoader = false }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="my-3 w-[380px] m-auto">
        Please scan this QR Code using your preferred Solana Pay Wallet. Please
        make sure you have the required amount of USDC-SPL in your wallet before
        scanning this QR.
      </p>
      <QRCode url={qr} />
      <p className="mb-6 w-[380px] m-auto">
        Upon successful payment, please click the button below to complete the
        purchase. Please note that clicking the button before making the payment
        will log you out of the website.
      </p>
      <button
        className="flex items-center justify-center flex-col text-center w-[100%] max-w-[390px] m-auto h-[54px] rounded bg-[#000000] text-white font-bold text-lg hover:opacity-90 transition-opacity"
        onClick={onClick}
      >
        {showLoader ? <Loader color="white" /> : "Verify Payment"}
      </button>
    </div>
  )
}

export default QR
