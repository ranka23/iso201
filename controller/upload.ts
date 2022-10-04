import { NextApiRequest, NextApiResponse } from "next"
import errors from "constants/errors"
import VideoEntry from "model/VideoEntry"
import log from "utils/logger"
import { validateVideoEntry } from "validations/videoEntry"
import servErr from "utils/servErr"
import Asset from "model/Asset"

export const videoEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  // req.body
  console.log("VideoEntry Called: ", req.body)

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
      bitrate,
      location
    )

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
    const video = await new VideoEntry(VideoGuid)

    if (video) {
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
      } = video
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
        duration,
        location
      )
      // return 200 status
      if (asset) {
        return res.status(200)
      } else {
        // TODO:  If the asset wasn't created do something.
      }
    } else {
      // TODO: If the video entry is not found do something.
    }
  } catch (error: any) {
    log.error("VIDEO ENTRY UPLOAD ERROR: ", error)
    return servErr(res)
  }
}
