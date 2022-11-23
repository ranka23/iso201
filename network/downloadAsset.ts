import axios from "axios"

const downloadAsset = ({ url = "", fname = "", mime = "" }) => {
  axios({
    url,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data)

    // create "a" HTML element with href to file & click
    const link = document.createElement("a")
    link.href = href
    link.setAttribute("download", fname + mime) //or any other extension
    document.body.appendChild(link)
    link.click()

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  })
}
export default downloadAsset
