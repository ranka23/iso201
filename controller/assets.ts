import { NextApiRequest, NextApiResponse } from "next"
import { es } from "services"
import Asset from "model/Asset"
import log from "utils/logger"
import servErr from "utils/servErr"
import { createESSearchQuery } from "utils/elasticSearch"
export const getAssets = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("REQ BODY: ", req.body)
  try {
    // Get all these queries from elastic search
    const filters = createESSearchQuery(req.body)
    console.log("FILTERS: ", JSON.stringify(filters))
    const videos = await es().search<Asset>({
      index: "assets",
      ...filters,
    })
    console.log("VIDEOS: ", videos.hits)
    res.status(200).json({ ...videos.hits })
  } catch (error: any) {
    log.error("getAssets Controller error", error)
    servErr(res)
  }
}
