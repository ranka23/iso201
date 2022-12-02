import { useState, useCallback } from "react"
import { useRouter } from "next/router"
import { get } from "services/axios"
import { useError } from "../../hooks/useError"
import errors from "../../constants/errors"
import { LoaderSmall } from "../widgets/Loader/Loader"
import fileDownload from "js-file-download"

interface Props {
  fname: string
  id: number
  mime: string
}

const Download: React.FC<Props> = ({ fname, id, mime }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useError()
  const downloadAsset = useCallback(
    async ({ url = "", fname = "", mime = "" }) => {
      //fileDownload(url, fname + mime)
      // create "a" HTML element with href to file & click
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", fname + mime) //or any other extension
      document.body.appendChild(link)
      link.click()
      setIsLoading(false)
      return () => {
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    },
    []
  )

  const handleOnDownloadClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      setIsLoading(true)
      try {
        const res = await get<{ url?: string; message?: string }>(
          `/assets/${id}/download`
        )

        if (res.status !== 200) {
          return router.push("/login")
        }
        if (res.data.message === "unauthorized") {
          return router.push("/login")
        }
        const { url } = res.data
        if (url && url?.length < 5) {
          return dispatch({
            type: "SET_ERROR",
            payload: errors.unable_to_download_resource,
          })
        }
        downloadAsset({
          url,
          fname,
          mime,
        })
      } catch (error: any) {
        return dispatch({
          type: "SET_ERROR",
          payload: errors.unable_to_download_resource,
        })
      }
    },
    [dispatch, downloadAsset, fname, id, mime, router]
  )

  return (
    <button
      className={`w-[114px] h-[40px] flex items-center justify-center mr-4 border border-black text-xl font-bold ${
        isLoading ? "cursor-wait" : "hover:bg-black"
      } hover:text-white transition`}
      disabled={isLoading}
      onClick={handleOnDownloadClick}
    >
      {isLoading ? <LoaderSmall color="black" /> : "Download"}
    </button>
  )
}

export default Download
