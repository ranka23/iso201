import { NextApiRequest, NextApiResponse } from "next"
import errors from "constants/errors"
import Asset from "model/Asset"
import servErr from "utils/servErr"
import log from "utils/logger"
import Like from "model/Like"

export const getStats = async (req: NextApiRequest, res: NextApiResponse) => {
  const { assetID } = req.query

  if (!assetID) {
    return res.status(401).json({ error: errors.asset_id_required })
  }
  try {
    const asset = await new Asset(parseInt(assetID as string)).getStats()

    if (asset?.id) {
      return res.status(200).json({
        id: asset.id,
        likes: asset.likes,
        views: asset.views,
      })
    } else {
      return res.status(404).json({ errors: errors.failed_to_find_data })
    }
  } catch (error) {
    log.error("getStats Controller error", error)
    servErr(res)
  }
}

export const updateStats = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { updateValue } = req.body
  const { assetID: _assetID } = req.query
  const userID = req?.user?.id

  const assetID = parseInt(_assetID as string)

  if (!assetID) {
    return res.status(401).json({ error: errors.asset_id_required })
  }

  try {
    if (updateValue === "view") {
      const asset = await new Asset(assetID).incrementView()
      if (asset.id) {
        return res.status(200).json({ message: "success" })
      } else {
        return res.status(400).json({ message: "failed" })
      }
    } else {
      let like = null
      if (!userID) {
        return res.status(401).json({ error: errors.user_must_be_logged_in })
      }
      if (updateValue === "like") {
        like = await new Like(userID, assetID).create()
        new Asset(assetID).mutateLike("+")
      } else if (updateValue === "unlike") {
        like = await new Like(userID, assetID).delete()
        new Asset(assetID).mutateLike("-")
      }
      if (like) return res.status(200).json({ message: "success" })
      else return res.status(401).json({ errors: errors.failed_to_save_like })
    }
  } catch (error: any) {
    log.error("updateStats Controller error", error)
    servErr(res)
  }
}

export const hasUserLikedAsset = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { assetID } = req?.query
  const userID = req?.user?.id
  if (!assetID) {
    return res.status(401).json({ error: errors.asset_id_required })
  }

  if (!userID) {
    return res.status(401).json({ error: errors.user_must_be_logged_in })
  }

  try {
    const hasLiked = await new Like(
      userID,
      parseInt(assetID as string)
    ).hasLiked()
    return res.status(200).json({ hasLiked })
  } catch (error: any) {
    log.error("hasUserLikedAsset Controller error", error)
    servErr(res)
  }
}

// TODO:
export const getUsersLikes = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {}
