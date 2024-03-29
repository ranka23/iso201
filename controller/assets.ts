import { SearchRequest } from "@elastic/elasticsearch/lib/api/types"
import Asset from "model/Asset"
import { NextApiRequest, NextApiResponse } from "next"
import { es } from "services"
import {
  createESSearchQuery,
  createESSimilarSearchQuery,
  createESSortQuery,
} from "utils/elasticSearch"
import log from "utils/logger"
import servErr from "utils/servErr"
import errors from "constants/errors"
import User from "model/User"
import crypto from "crypto"

export const getAssets = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const assets = await getSearch(req.body)
    // @ts-ignore
    if (assets?.hits?.total?.value && assets?.hits?.total?.value > 0)
      return res.status(200).json({ ...assets })

    return res.status(404).json({ error: errors.assets_not_found })
  } catch (error: any) {
    log.error("getAssets Controller error", error)
    servErr(res)
  }
}

export const getSearch = async (data: GetAssetReq) => {
  try {
    // Get all these queries from elastic search
    const filters = createESSearchQuery(data)
    const sorting = createESSortQuery(data)

    let options: SearchRequest = {
      index: "assets",
    }
    if (!Array.isArray(filters)) {
      options = {
        ...options,
        ...filters,
      }
    }
    if (data.sort) {
      options = { ...options, ...sorting }
    }
    if (data.provide) {
      options._source = data.provide
    }
    const videos = await es().search<Asset>(options)
    if (videos?.hits?.hits && videos.hits.hits.length > 0) {
      return videos
    }
    return null
  } catch (err: any) {
    throw new Error(err)
  }
}

export const getThumbnailData = async (data?: GetAssetReq) => {
  const response = await getSearch({
    sort: {
      keywords: [
        {
          fieldName: "rating",
          order: "desc",
        },
        {
          fieldName: "created",
          order: "desc",
        },
        {
          fieldName: "likes",
          order: "desc",
        },
        {
          fieldName: "downloads",
          order: "desc",
        },
        {
          fieldName: "views",
          order: "desc",
        },
      ],
      from: 0,
      size: 50,
    },
    provide: [
      "thumbnail",
      "type",
      "id",
      "scale",
      "title",
      "poster",
      "genre",
      "album",
    ],
    ...data,
  })
  return {
    hits: response?.hits.hits.map((item) => item._source),
    total: response?.hits.total,
  }
}

export const getSimilar = async (id: string | number, provide: string[]) => {
  const query = createESSimilarSearchQuery(id)
  try {
    let options: SearchRequest = {
      index: "assets",
      ...query,
    }

    if (provide && provide.length) {
      options._source = provide
    }

    const videos = await es().search<Asset>(options)
    if (videos?.hits?.hits && videos.hits.hits.length > 0) {
      return videos.hits.hits.map(({ _source: itm }) => itm).filter(Boolean)
    }
    return null
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getSimilarThumbnails = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { assetID, provide } = req.query
  try {
    const query = await getSimilar(
      assetID as string,
      (provide as string[]) || [
        "id",
        "thumbnail",
        "title",
        "type",
        "scale",
        "poster",
        "genre",
        "album",
        "likes",
        "views",
      ]
    )
    if (query?.length) {
      return res.status(200).json({ similar: query })
    }
    return res.status(500).json({ error: errors.failed_to_find_data })
  } catch (error: any) {
    log.error("Update asset error: ", error)
    return servErr(res)
  }
}

export const updateAsset = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const {
      id,
      title,
      fname,
      type,
      size,
      tags,
      mime,
      uri,
      scale,
      thumbnail,
      fps,
      bitrate,
      rating,
      free,
      duration,
      location,
      coordinates,
      poster,
      description,
      comment,
      genre,
      album,
      created,
      modified,
      likes,
      views,
      downloads,
    } = req.body
    const assetID = await new Asset(
      id,
      title,
      fname,
      type,
      size,
      tags,
      mime,
      uri,
      scale,
      thumbnail,
      fps,
      bitrate,
      rating,
      free,
      duration,
      location,
      coordinates,
      poster,
      description,
      comment,
      genre,
      album,
      created,
      modified,
      likes,
      views,
      downloads
    ).update()

    if (assetID.id === id) {
      return res.status(200).json({ message: "success" })
    } else {
      return res.status(401).json({ error: errors.failed_to_update_asset })
    }
  } catch (err: any) {
    log.error("Update asset error: ", err)
    return servErr(res)
  }
}

export const downloadAsset = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { assetID } = req.query
  if (!assetID) {
    return res.status(400).json({ errors: errors.asset_id_not_found })
  }

  try {
    // Check if asset is free or paid
    const asset = await new Asset(parseInt(assetID as string)).read()

    if (!asset?.uri) {
      return res.status(404).json({ errors: errors.assets_not_found })
    }

    if (asset?.free) {
      // Allow download
      return sendDownloadUrl(asset, res)
    } else {
      if (!req?.user) {
        return res.status(200).json({ message: "unauthorized" })
      }
      const { id: userID, pro } = req?.user

      if (!pro) {
        // Redirect to Purchase page
        return res.status(200).json({ message: "unauthorized" })
      } else {
        const user = await new User(userID).readBasicInfo()
        if (user?.pro) {
          // Allow download
          return sendDownloadUrl(asset, res)
        } else {
          // Redirect to Purchase page
          return res.status(200).json({ message: "unauthorized" })
        }
      }
    }
  } catch (error: any) {
    log.error("Download asset error: ", error)
    return servErr(res)
  }
}

const sendDownloadUrl = (asset: Asset, res: NextApiResponse) => {
  const url = createDownloadUrl({
    uri: asset.uri,
    type: asset.type,
  })
  return res.status(200).json({ url })
}

const createDownloadUrl = ({ uri = "", type = "" as AssetType }) => {
  let path = `/${uri}/original`
  let securityKey = process.env.BUNNY_VIDEO_DOWNLOAD_SECRET
  let url = process.env.BUNNY_VIDEO_PULL_ZONE
  if (type === "image") {
    path = `/images/${uri}`
    securityKey = process.env.BUNNY_IMAGE_DOWNLOAD_SECRET
    url = process.env.BUNNY_IMAGE_PULL_ZONE
  }

  // Set the time of expiry to one hour from now
  var expires = Math.round(Date.now() / 1000) + 300

  var hashableBase = securityKey + path + expires

  // Generate and encode the token
  var md5String = crypto.createHash("md5").update(hashableBase).digest("binary")
  var token = Buffer.from(md5String, "binary").toString("base64")
  token = token.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "")

  // Generate the URL
  return url + path + "?token=" + token + "&expires=" + expires
}

export const populateFilter = async (page?: string, genre?: string) => {
  try {
    const data = await new Asset().populateFilters(genre)
    const extractValues = (data?: Array<{ [key: string]: any }>) => {
      let key = ""
      return data
        ?.map((itm) => {
          key = Object.keys(itm)[0]
          return itm[key]
        })
        .filter(Boolean)
    }

    const filters: PopulateFilters = {
      type: extractValues(data?.typeQuery) as Array<AssetType>,
      scale: extractValues(data?.scaleQuery) as Array<[number, number]>,
      genre: extractValues(data?.genreQuery) as Array<string>,
      album: extractValues(data?.albumQuery) as Array<string>,
      fps: extractValues(data?.fpsQuery) as Array<number>,
      views: data?.viewsQuery[0].views,
      duration: data?.durationQuery[0].duration,
    }

    if (page === "genre") {
      delete filters.genre
    } else if (page === "album") {
      delete filters.album
      delete filters.genre
    }

    return filters
  } catch (error: any) {
    throw new Error(error)
  }
}
