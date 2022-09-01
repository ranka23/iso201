import axios from 'axios'

interface GoogleTokenResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  id_token: string
}

const getGoogleOAuthTokens = async ({
  code,
}: {
  code: string
}): Promise<GoogleTokenResponse> => {
  const url = "https://oauth2.googleapis.com/token"

  const values = {
    code,
    client_id: process.env.GOOGLE_AUTH_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
    redirect_uri: process.env.GOOGLE_AUTH_REDIRECT_URL as string,
    grant_type: "authorization_code",
  }

  try {
    const res = await axios.post<GoogleTokenResponse>(
      url,
      new URLSearchParams(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    return res.data
  } catch (error: any) {
    //TODO: Front-end error logging
    throw new Error(error.message)
  }
}

export default getGoogleOAuthTokens