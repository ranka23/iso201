import ColorLink from "widgets/ColorLink/ColorLink"
import Icon from "widgets/Icon/Icon"
import solanaPayButton from "public/solana-pay-button.svg"

interface Props {
  onClick: () => void
}

const Details: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      <ul className="space-y-2 list-disc mt-6">
        <li>
          <ColorLink href="https://en.wikipedia.org/wiki/USD_Coin">
            USDC
          </ColorLink>{" "}
          is a stable cryptocurrency.
        </li>
        <li>
          Only USDC on the{" "}
          <ColorLink href="https://solana.com/">Solana Blockchain</ColorLink> is
          supported.{" "}
          <ColorLink href="https://www.circle.com/en/usdc-multichain/solana">
            (USDC-SPL)
          </ColorLink>
        </li>
        <li>
          You will need the required amount of USDC in a{" "}
          <ColorLink href="https://docs.solanapay.com/#supporting-wallets">
            wallet that supports Solana Pay.
          </ColorLink>
        </li>
        <li>
          In step 2, you will get a QR code on the page. Scan the QR from your
          wallet to start the transaction.
        </li>
        <li>
          Browser wallets are not supported at the moment. Only wallets on your
          smartphone can scan the QR Code.
        </li>
        <li>
          On scanning the QR code, your wallet will list the details of the
          transaction.
        </li>
        <li>
          Please verify the amount and the description before proceeding. The
          amount showing up in your wallet should not exceed the original amount
          of the purchase.
        </li>
        <li>
          After payment, click the <strong>&quot;Verify Payment&quot;</strong>{" "}
          button below the QR Code to complete the transaction.{" "}
          <span className="text-red-500 font-bold">Important!</span>
        </li>
        <li>
          If you are uncomfortable using Web3 payment solutions, you can always
          choose Paypal from the left panel to make a traditional card
          transaction. However, transactions via Paypal levy a processing fee.
        </li>
      </ul>
      <span className="flex items-center justify-between my-6">
        <ColorLink href="https://youtu.be/5uABl49jknk">
          Solana Pay demo
        </ColorLink>
        <ColorLink href="https://www.circle.com/en/usdc/individuals#get-usdc">
          How to get USDC-SPL
        </ColorLink>
      </span>
      <button
        className="w-full bg-[#000000] rounded flex items-center hover:opacity-90 transition-opacity"
        onClick={onClick}
      >
        <Icon src={solanaPayButton} />
      </button>
    </>
  )
}

export default Details
