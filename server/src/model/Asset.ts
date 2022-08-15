export default class Asset {
  id: number
  title: string
  fname: string
  type: AssetType
  size: number
  tags: Array<string>
  mime: Array<string>
  likes: number
  views: number
  uri: string
  scale: number
  createdAt: number
  duration?: number
  updatedAt?: number

  constructor(
    id: number,
    title: string,
    fname: string,
    type: AssetType,
    size: number,
    tags: Array<string>,
    mime: Array<string>,
    uri: string,
    likes: number,
    views: number,
    scale: number,
    createdAt: number,
    duration?: number,
    updatedAt?: number
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
    this.createdAt = createdAt
    this.duration = duration
    this.updatedAt = updatedAt
  }

  async create() {}
}
