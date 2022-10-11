import { insert, update } from "sql/common"
import { pg, es } from "../services"
import log from "../utils/logger"
export default class Asset {
  id?: number
  title?: string
  fname?: string
  type?: AssetType
  size?: number
  tags?: Array<string>
  mime?: string
  likes?: number
  views?: number
  uri?: string
  thumbnail?: string
  scale?: [number, number]
  location?: string
  fps?: number
  esid?: string
  created?: number
  bitrate?: number
  rating?: number
  duration?: number
  modified?: number

  constructor(
    id?: number,
    title?: string,
    fname?: string,
    type?: AssetType,
    size?: number,
    tags?: Array<string>,
    mime?: string,
    uri?: string,
    scale?: [number, number],
    thumbnail?: string,
    fps?: number,
    bitrate?: number,
    rating?: number,
    duration?: number,
    location?: string,
    esid?: string,
    created?: number,
    modified?: number,
    likes?: number,
    views?: number
  ) {
    this.id = id
    this.title = title
    this.fname = fname
    this.type = type
    this.size = size
    this.tags = tags
    this.mime = mime
    this.likes = likes
    this.views = views
    this.scale = scale
    this.uri = uri
    this.thumbnail = thumbnail
    this.created = created
    this.duration = duration
    this.modified = modified
    this.location = location
    this.esid = esid
    this.fps = fps
    this.bitrate = bitrate
    this.rating = rating
  }

  async create() {
    const query = insert("assets", [
      "title",
      "fname",
      "type",
      "size",
      "tags",
      "mime",
      "uri",
      "scale",
      "thumbnail",
      "duration",
      "location",
      "fps",
      "bitrate",
      "rating",
    ])
    const values = [
      this.title,
      this.fname,
      this.type,
      this.size,
      this.tags,
      this.mime,
      this.uri,
      this.scale,
      this.thumbnail,
      this.duration,
      this.location,
      this.fps,
      this.bitrate,
      this.rating,
    ]

    try {
      const {
        rows: [assets],
      } = await pg().query<Asset>(query, values)

      if (!assets?.id || typeof assets.id !== "number") {
        log.error(
          `Failed to insert asset with filename("${this.fname}"), title("${this.title}") and uri("${this.uri}") in asset table`
        )
        return
      }

      const esData = await es().index({
        index: "assets",
        id: assets.id.toString(),
        document: {
          title: assets.title,
          fname: assets.fname,
          type: assets.type,
          size: assets.size,
          tags: assets.tags,
          mime: assets.mime,
          uri: assets.uri,
          scale: assets.scale,
          thumbnail: assets.thumbnail,
          fps: assets.fps,
          bitrate: assets.bitrate,
          rating: assets.rating,
          duration: assets.duration,
          location: assets.location,
          created: assets.created,
          likes: assets.likes,
          views: assets.views,
        },
      })

      if (esData.result === "created") {
        const idQuery = update("assets", "id", ["esid"])
        const idValue = [esData._id, assets.id]
        const { rows } = await pg().query(idQuery, idValue)
        if (rows.length > 0) {
          return assets
        } else {
          log.error(
            `Failed to add esid to Asset(${assets.id}) table when creating the asset.`
          )
        }
      } else {
        log.error(`Failed add to Asset(${assets.id}) to Elastic Search index`)
      }
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
