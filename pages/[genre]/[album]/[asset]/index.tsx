import { getSearch } from "controller/assets"
import { GetStaticPropsContext } from "next"
import BunnyPlayer from "components/widgets/BunnyPlayer/BunnyPlayer"
import Icon from "components/widgets/Icon/Icon"
import css from "./index.module.css"
import heart from "public/icons/heart.svg"
import axios from "axios"
import { useState } from "react"

interface Props {
  id: number
  isFree: boolean
  type: AssetType
  title: string
  uri: string
  tags: string[]
  scale: [number, number]
  fps: number
  mime: string
  likes: string
  views: string
  size: string
  duration: string
  description: string
  fname: string
}

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

const Asset: React.FC<Props> = ({
  id,
  uri,
  title,
  description,
  fps,
  likes,
  views,
  size,
  mime,
  tags,
  scale,
  duration,
  fname,
}) => {
  const [error, setError] = useState("")
  const fileData = [
    {
      label: "Duration",
      value: `${duration}s`,
    },
    {
      label: "Resolution",
      value: `${scale[0]}x${scale[1]}`,
    },
    {
      label: "Size",
      value: size,
    },
    {
      label: "FPS",
      value: fps,
    },
    {
      label: "Type",
      value: mime,
    },
  ]
  const handleOnDownloadClick = async () => {
    try {
      const res = await axios.post<{ url: string }>(
        "http://localhost:3000/api/assets/download",
        {
          assetID: id,
        }
      )
      const { url } = res.data
      if (url.length < 5) {
        // TODO: Send log to sentry or something
        return setError(
          "Unable to download resource, please try after some time."
        )
      }
      downloadAsset({
        url,
        fname,
        mime,
      })
    } catch (error: any) {
      // TODO: Send log to sentry or something
      return setError(
        "Unable to download resource, please try after some time."
      )
    }
  }
  return (
    <div className={css.container}>
      <div>
        <BunnyPlayer videoId={uri} />
        <h2 className="text-2xl font-medium mt-4">{title}</h2>
        <div className="flex justify-between items-center mt-4 mb-2">
          <div className="flex items-center">
            <button
              onClick={handleOnDownloadClick}
              className="py-2 px-4 mr-4 border border-black text-xl font-bold hover:bg-black hover:text-white transition"
            >
              Download
            </button>
            <span className="flex items-center mr-6">
              <Icon src={heart} width={24} />
              {parseInt(likes) !== 0 ? (
                <span className="mr-2 text-xl font-medium">{likes}</span>
              ) : null}
            </span>
          </div>
          <span className="text-xl font-medium">{views} views</span>
        </div>
        <div className="flex items-center gap-12 mb-6">
          {fileData.map((item) => (
            <div key={item.label}>
              <span className="font-medium mr-1">{item.label}</span>
              <span className="text-xl">{item.value}</span>
            </div>
          ))}
        </div>
        <p>{description}</p>
        <span>
          {tags.map((item) => (
            <span className="py-2 px-3 rounded bg-[#eee] mr-4" key={item}>
              {item}
            </span>
          ))}
        </span>
      </div>
      <div>Second Container</div>
    </div>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const assets = await getSearch({
    id: parseInt(context.params?.asset as string),
  })

  const asset = assets?.hits.hits[0]._source
  if (asset) {
    return {
      props: {
        id: asset.id,
        isFree: asset.free,
        type: asset.type,
        title: asset.title,
        uri: asset.uri,
        tags: asset.tags,
        scale: asset.scale,
        fps: asset.fps,
        mime: asset.mime,
        likes: asset.likes,
        views: asset.views,
        size: asset.size,
        duration: asset.duration,
        description: asset.description,
        fname: asset.fname,
      },
    }
  } else {
    return {
      props: {},
    }
  }
}

export default Asset
