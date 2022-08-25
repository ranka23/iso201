import { NextApiResponse } from 'next';

export default function servErr (res: NextApiResponse, message?: string) {
  return res.status(500).json({
    error: {
      code: "server_error",
      message:
        message ||
        "We encountered a problem on our end. We are looking into it. Please try again in some time.",
    },
  })
}
