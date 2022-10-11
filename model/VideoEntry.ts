import { insert, select } from "sql/common"
import { pg } from "services"

export default class VideoEntry {
  id?: number
  title?: string
  fname?: string
  type?: AssetType
  size?: number
  tags?: Array<string>
  mime?: string
  scale?: [number, number]
  duration?: number
  fps?: number
  bitrate?: number
  location?: string
  uri?: string
  thumbnail?: string
  rating?: number


  constructor(
    uri?: string,
    thumbnail?: string,
    title?: string,
    fname?: string,
    type?: AssetType,
    size?: number,
    tags?: Array<string>,
    mime?: string,
    scale?: [number, number],
    duration?: number,
    fps?: number,
    rating?: number,
    bitrate?: number,
    location?: string
  ) {
    this.tags = tags
    this.bitrate = bitrate
    this.duration = duration
    this.fps = fps
    this.scale = scale
    this.title = title
    this.fname = fname
    this.type = type
    this.size = size
    this.mime = mime
    this.location = location
    this.uri = uri
    this.thumbnail = thumbnail
    this.rating = rating
  }

  async create(): Promise<VideoEntry> {
    const query = insert("video_entry", [
      "title",
      "fname",
      "type",
      "size",
      "tags",
      "mime",
      "scale",
      "duration",
      "fps",
      "bitrate",
      "location",
      "uri",
      "thumbnail",
      "rating"
    ])
    const values = [
      this.title,
      this.fname,
      this.type,
      this.size,
      this.tags,
      this.mime?.toLowerCase(),
      this.scale,
      this.duration,
      this.fps,
      this.bitrate,
      this.location,
      this.uri,
      this.thumbnail,
      this.rating
    ]

    try {
      const {
        rows: [video_entry],
      } = await pg().query<VideoEntry>(query, values)
      return video_entry
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async read(): Promise<VideoEntry> {
    try {
      const query = select("video_entry", "uri")
      const value = [this.uri]
      const {
        rows: [video_entry],
      } = await pg().query(query, value)
      return video_entry
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
