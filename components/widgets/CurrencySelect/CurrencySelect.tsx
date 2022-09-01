import Image from "next/image"
import usa from "public/countries/usa-flag.png"

interface CurrencySelect {
  currency: AvailableCurrencies
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void
}

const CurrencySelect: React.FC<CurrencySelect> = ({ currency, onChange }) => {
  return (
    <label>
      <span className="font-medium text-lg">Select Currency</span>
      <select
        className="p-4 w-full mb-4 rounded"
        value={currency}
        onChange={onChange}
      >
        <option value="USD">United States Dollar</option>
        <option value="CAD">Canadian Dollar</option>
        <option value="AUD">Australian Dollar</option>
        <option value="EUR">Euro</option>
        <option value="GBP">Pound Sterling</option>
        <option value="JPY">Japanese Yen</option>
        <option value="CHF">Swiss Franc</option>
        <option value="DKK">Danish Krone</option>
        <option value="NOK">Norwegian Krone</option>
        <option value="NZD">New Zealand Dollar</option>
        <option value="SEK">Swedish Krona</option>
        <option value="SGD">Singapore Dollar</option>
        <option value="THB">Thai Baht</option>
        <option value="MXN">Mexican Peso</option>
        <option value="ILS">Israeli New Shekel</option>
        <option value="HKD">Hong Kong Dollar</option>
      </select>
    </label>
  )
}

export default CurrencySelect
