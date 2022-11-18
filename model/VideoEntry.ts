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
  poster?: string
  coordinates?: string
  description?: string
  comment?: string
  genre?: string
  album?: string
  free?: boolean

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
    free?: boolean,
    bitrate?: number,
    location?: string,
    poster?: string,
    coordinates?: string,
    genre?: string,
    album?: string,
    description?: string,
    comment?: string
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
    this.free = free
    this.poster = poster
    this.comment = comment
    this.description = description
    this.coordinates = coordinates
    this.genre = genre
    this.album = album
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
      "rating",
      "poster",
      "comment",
      "description",
      "coordinates",
      "genre",
      "album",
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
      this.rating,
      this.poster,
      this.comment,
      this.description,
      this.coordinates,
      this.genre,
      this.album,
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

  async delete(id: number) {
    try {
      const query = `DELETE FROM video_entry WHERE id=$1`
      const value = [id]

      const {
        rows: [assets],
      } = await pg().query(query, value)
      return assets
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
