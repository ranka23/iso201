import axios from "axios"

const convertCurrency = (
  amount: string,
  to: AvailableCurrencies,
  from: AvailableCurrencies = "USD"
) => {
  const options = {
    method: "GET",
    url: "https://currency-converter5.p.rapidapi.com/currency/convert",
    params: { format: "json", from, to, amount },
    headers: {
      "X-RapidAPI-Key": "49070bd215msha7648005f83b6c0p17a2d3jsn53232f94f267",
      "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
    },
  }

  return axios.request(options)
}

export default convertCurrency

export const checkCurrencyIsAvailableCurrency = (
  currency: AvailableCurrencies
) => {
  const arr = [
    "USD",
    "AUD",
    "CAD",
    "CHF",
    "DKK",
    "EUR",
    "GBP",
    "JPY",
    "NOK",
    "NZD",
    "SEK",
    "SGD",
    "THB",
    "MXN",
    "ILS",
    "HKD",
  ]
  return arr.some((value) => value === currency)
}
