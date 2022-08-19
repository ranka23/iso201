declare namespace Express {
    interface Request {
      user: ReqUser
    }
    namespace Multer {
      interface File {
        key: string
      }
    }
  }


interface RequestUser {
  id: string,
  pro: boolean,
  email: string,
}


type AssetType = "image" | "video" | "audio"

interface JWTTokenData {
  id: string
  email: string
  pro?: boolean
}

interface GoogleUser {
  email: string
  email_verified: boolean
  name: string
  picture: string
}

interface PaypalAccessTokenResponse {
  access_token: string
}

interface PaypalOrderData {
  intent: string;
  purchase_units: {
      items: {
          name: string;
          description: string;
          quantity: string;
          unit_amount: {
              currency_code: string;
              value: string;
          };
      }[];
      amount: {
          currency_code: string;
          value: number;
          breakdown: {
            discount: {
              currency_code: string,
              value: string,
            },
            item_total: {
              currency_code: string,
              value: string,
            },
          },
      };
  }[];
  application_context: {
    brand_name: string,
    shipping_preference: string,
  };
}
