import { insert, selectResponse, update } from "sql/common"
import { pg, es } from "../services"
import log from "../utils/logger"
import { select } from "sql/common"
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
  created?: number
  bitrate?: number
  rating?: number
  duration?: number
  modified?: number
  downloads?: number
  poster?: string
  coordinates?: string
  description?: string
  comment?: string
  genre?: string
  album?: string
  free?: boolean

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
    free?: boolean,
    duration?: number,
    location?: string,
    coordinates?: string,
    poster?: string,
    description?: string,
    comment?: string,
    genre?: string,
    album?: string,
    created?: number,
    modified?: number,
    likes?: number,
    views?: number,
    downloads?: number
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
    this.fps = fps
    this.bitrate = bitrate
    this.rating = rating
    this.free = free
    this.downloads = downloads
    this.poster = poster
    this.coordinates = coordinates
    this.album = album
    this.description = description
    this.comment = comment
    this.genre = genre
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
      "poster",
      "coordinates",
      "album",
      "description",
      "comment",
      "genre",
      "free",
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
      this.poster,
      this.coordinates,
      this.album,
      this.description,
      this.comment,
      this.genre,
      !this.free ? false : true,
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

      const esData = await makeCallToES(assets)
      return esData
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async delete(id: number) {
    const query = `DELETE FROM video_entry WHERE id=$1`
    const value = [id]

    try {
      const {
        rows: [assets],
      } = await pg().query(query, value)
      return assets
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async read(): Promise<Asset> {
    const query = select("assets", "id")
    const value = [this.id]

    try {
      const {
        rows: [assets],
      } = await pg().query(query, value)
      return assets
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getStats(): Promise<Asset> {
    const query = selectResponse("assets", "id", ["id", "likes", "views"])
    const value = [this.id]
    try {
      const {
        rows: [assets],
      } = await pg().query(query, value)
      return assets
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async update() {
    let idIndex = 0
    const data = JSON.parse(JSON.stringify(this))
    const updateKeys = Object.keys(data)
      .filter((item, index) => {
        if (item === "id") {
          idIndex = index
        }
        return item !== "id"
      })
      .filter(Boolean)
    const updateValues = Object.values(data).filter(Boolean)
    updateValues.splice(idIndex, 1)
    const query = update("assets", "id", updateKeys, "id")
    const values = [...updateValues, data.id]
    try {
      const {
        rows: [assets],
      } = await pg().query(query, values)

      if (assets) {
        const response = await es().update({
          index: "assets",
          id: data.id?.toString() || "0",
          doc: {
            ...data,
          },
        })
        if (response._id) {
          return assets
        }
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async incrementView(): Promise<Asset> {
    const query = `UPDATE assets SET views = views + 1 WHERE id=$1 RETURNING id`
    const value = [this.id]
    try {
      const {
        rows: [assets],
      } = await pg().query(query, value)
      return assets
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async mutateLike(operation: "+" | "-"): Promise<Asset> {
    const query = `UPDATE assets SET likes = likes ${operation} 1 WHERE id=$1 RETURNING id`
    const value = [this.id]
    try {
      const {
        rows: [assets],
      } = await pg().query(query, value)
      return assets
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

const makeCallToES = async (asset: Asset, tries = 0) => {
  try {
    const esData = await es().index({
      index: "assets",
      id: asset.id?.toString(),
      document: {
        ...asset,
      },
    })
    if (esData.result === "created") {
      return asset
    } else {
      if (tries < 3) {
        makeCallToES(asset)
      } else {
        // Delete Entry in database, if not saved to Elastic Search
        await pg().query(`DELETE FROM assets WHERE id=$1`, [asset.id])
        log.error(`Failed add to Asset(${asset.id}) to Elastic Search index`)
      }
      return null
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
