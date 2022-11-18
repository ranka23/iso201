import { NextApiRequest, NextApiResponse } from "next"
import errors from "constants/errors"
import VideoEntry from "model/VideoEntry"
import log from "utils/logger"
import { validateVideoEntry } from "validations/videoEntry"
import servErr from "utils/servErr"
import Asset from "model/Asset"

const checkAccessKey = (req: NextApiRequest) => {
  const accesskey = process.env.UPLOAD_ASSET_SECRET
  if (
    accesskey &&
    req.headers["accesskey"] &&
    req.headers["accesskey"]?.toString().trim() === accesskey.trim()
  ) {
    return true
  }
  return false
}

export const videoEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const isSecure = checkAccessKey(req)

  if (!isSecure) {
    return res.status(403).json({ error: errors.unauthorized_access })
  }

  const {
    title,
    fname,
    type,
    size,
    tags,
    mime,
    scale,
    duration,
    fps,
    bitrate,
    location,
    uri,
    thumbnail,
    rating,
    poster,
    coordinates,
    genre,
    album,
    description,
    comment,
    free,
  } = req.body

  // Validate all the data received
  const { status, error } = validateVideoEntry(req.body)
  if (status !== 200) {
    return res.status(status).json({
      error,
    })
  }
  try {
    // Take all the data and store it in the video_entry table
    const videoEntry = await new VideoEntry(
      uri,
      thumbnail,
      title,
      fname,
      type,
      size,
      tags,
      mime,
      scale,
      duration,
      fps,
      rating,
      free,
      bitrate,
      location,
      poster,
      coordinates,
      genre,
      album,
      description,
      comment
    ).create()

    if (videoEntry?.id) {
      return res.status(200).json({ message: "success" })
    }
    return res
      .status(400)
      .json({ error: errors.failed_to_save_video_entry_in_db })
  } catch (error: any) {
    log.error("VIDEO ENTRY UPLOAD ERROR: ", error)
    return servErr(res)
  }
}

export const bunnyWebHook = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { VideoGuid, Status } = req.body

  if (Status !== 3) {
    return res.status(200)
  }

  try {
    // Check if the video exists in the VideoEntry table
    const video = await new VideoEntry(VideoGuid).read()

    if (video.id) {
      // Add the details to the Assets table
      const {
        bitrate,
        fname,
        mime,
        tags,
        title,
        fps,
        duration,
        location,
        scale,
        thumbnail,
        size,
        type,
        uri,
        rating,
        poster,
        album,
        coordinates,
        comment,
        description,
        genre,
      } = video

      if (!video.free && rating && rating <= 3) {
        video.free = true
      }
      const asset = await new Asset(
        undefined,
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
        video.free,
        duration,
        location,
        coordinates,
        poster,
        description,
        comment,
        genre,
        album
      ).create()
      // return 200 status
      if (asset) {
        new VideoEntry().delete(video.id)
        return res.status(200).json({ message: "success" })
      } else {
        // TODO:  If the asset wasn't created do something.
        log.warn(
          `Asset for uri: ${VideoGuid} was not created inspite receiving the data`
        )
        return res.status(200)
      }
    } else {
      // TODO: If the video entry is not found do something.
      log.warn(
        `Asset for uri: ${VideoGuid} was not created because video entry was not found for data`
      )
      return res.status(200)
    }
  } catch (error: any) {
    console.log("ERROR: ", error)
    log.error("VIDEO ENTRY UPLOAD ERROR: ", error)
    return servErr(res)
  }
}

export const createImageAsset = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const isSecure = checkAccessKey(req)
  if (!isSecure) {
    return res.status(403).json({ error: errors.unauthorized_access })
  }

  try {
    const {
      title,
      fname,
      type,
      size,
      tags,
      mime,
      uri,
      scale,
      thumbnail,
      rating,
      location,
      coordinates,
      description,
      comment,
      genre,
      album,
      free,
      poster,
    } = req.body

    // TODO: Validation

    if (free && rating && rating <= 3) {
      req.body.free = true
    }

    const fileName = "iso201.com_" + fname.split(".")[0]

    const asset = await new Asset(
      undefined,
      title,
      fileName,
      type,
      size,
      tags,
      "." + mime,
      uri,
      scale,
      thumbnail,
      undefined,
      undefined,
      rating,
      req.body.free,
      undefined,
      location,
      coordinates,
      poster,
      description,
      comment,
      genre,
      album
    ).create()

    if (asset?.id) {
      return res.status(200).json({ message: "success" })
    }
    return res.status(400).json({ error: errors.failed_to_upload_image })
  } catch (error) {
    log.error("ERROR: ", error)
    return servErr(res)
  }
}
