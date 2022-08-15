type AssetType = "image" | "video" | "audio"

interface JWTTokenData {
  id: string,
  email: string,
  isPro?: boolean,
}

interface GoogleUser {
  email: string
  email_verified: boolean
  name: string
  picture: string
}
