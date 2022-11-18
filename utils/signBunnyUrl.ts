import queryString from "querystring"
import crypto from "crypto"

function addCountries(url = "", a = "", b = "") {
  let tempUrl = url
  if (a != null) {
    const tempUrlOne = new URL(tempUrl)
    tempUrl += (tempUrlOne.search == "" ? "?" : "&") + "token_countries=" + a
  }
  if (b != null) {
    const tempUrlTwo = new URL(tempUrl)
    tempUrl +=
      (tempUrlTwo.search == "" ? "?" : "&") + "token_countries_blocked=" + b
  }
  return tempUrl
}

export function signUrl(
  uri = "",
  securityKey = "",
  expirationTime = 3600,
  userIp = "",
  isDirectory = false,
  pathAllowed = "",
  countriesAllowed = "",
  countriesBlocked = ""
) {
  /*
		url: CDN URL w/o the trailing '/' - exp. http://test.b-cdn.net/file.png
		securityKey: Security token found in your pull zone
		expirationTime: Authentication validity (default. 86400 sec/24 hrs)
		userIp: Optional parameter if you have the User IP feature enabled
		isDirectory: Optional parameter - "true" returns a URL separated by forward slashes (exp. (domain)/bcdn_token=...)
		pathAllowed: Directory to authenticate (exp. /path/to/images)
		countriesAllowed: List of countries allowed (exp. CA, US, TH)
		countriesBlocked: List of countries blocked (exp. CA, US, TH)
	*/

  let signaturePath = "",
    parameterDataUrl = "",
    hashableBase = "",
    parameterData = "",
    token = ""
  const expires = Math.floor(new Date().getTime() / 1000) + expirationTime
  const url = addCountries(uri, countriesAllowed, countriesBlocked)
  const parsedUrl = new URL(url)
  const parameters = new URL(url).searchParams
  if (pathAllowed != "") {
    signaturePath = pathAllowed
    parameters.set("token_path", signaturePath)
  } else {
    signaturePath = decodeURIComponent(parsedUrl.pathname)
  }
  parameters.sort()
  if (Array.from(parameters).length > 0) {
    parameters.forEach(function (value, key) {
      if (value == "") {
        return
      }
      if (parameterData.length > 0) {
        parameterData += "&"
      }
      parameterData += key + "=" + value
      parameterDataUrl += "&" + key + "=" + queryString.escape(value)
    })
  }
  hashableBase =
    securityKey +
    signaturePath +
    expires +
    (userIp != null ? userIp : "") +
    parameterData
  token = Buffer.from(
    crypto.createHash("sha256").update(hashableBase).digest()
  ).toString("base64")
  token = token
    .replace(/\n/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
  if (isDirectory) {
    return (
      parsedUrl.protocol +
      "//" +
      parsedUrl.host +
      "/bcdn_token=" +
      token +
      parameterDataUrl +
      "&expires=" +
      expires +
      parsedUrl.pathname
    )
  } else {
    return (
      parsedUrl.protocol +
      "//" +
      parsedUrl.host +
      parsedUrl.pathname +
      "?token=" +
      token +
      parameterDataUrl +
      "&expires=" +
      expires
    )
  }
}
