import { insert } from "sql/common"
import { pg } from "../services"
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
  createdAt?: number
  bitrate?: number
  rating?: number
  duration?: number
  updatedAt?: number

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
    createdAt?: number,
    updatedAt?: number,
    likes?: number,
    views?: number,
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
    this.createdAt = createdAt
    this.duration = duration
    this.updatedAt = updatedAt
    this.location = location
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
      "rating"
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
      } = await pg().query(query, values)
      return assets
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
