const errors = {
  unverified_email: {
    code: "unverified_email",
    message:
      "Your email address not verified by Google. To use our services, please use a verified Google account",
  },
  create_user_error: {
    code: "create_user_error",
    message:
      "Unable to create a user. Please try again or use another email address to sign up",
  },
  login_error: {
    code: "login_error",
    message: "Unable to log you in at this time, please try again in some time",
  },
  unverified_payment: {
    code: "unverified_purchase",
    message:
      "Unable to verify your payment success status. If the amount has been deducted on your end, please reach out to us via email at payments@iso201.com",
  },
  failed_to_place_order: {
    code: "failed_to_place_order",
    message: "Failed to place an order. Please try again in some time",
  },
  already_pro: {
    code: "already_pro",
    message:
      "You already have a PRO subscription. Cannot make another purchase with this email address until your subscription expires",
  },
  payment_received_but_not_pro_error: {
    code: "payment_received_but_not_pro_error",
    message:
      "We have received your payment, however our server was unable to grant you a pro access. Please reach out to us via email at payments@iso201.com and provide the registered email address",
  },
  refresh_token_not_found: {
    code: "refresh_token_not_found",
    message: "You need to login to access this page",
  },
  no_access_token: {
    code: "no_access_token",
    message: "Unable to get the Access Token",
  },
  jwt_verification_error: {
    code: "jwt_verification_error",
    message: "User Authentication failed.",
  },
  route_not_found: {
    code: "route_not_found",
    message: "Route not found."
  },
  invoiceID_not_provided: {
    conde: "invoiceID_not_provided",
    message: "Cannot proceed with an invoice ID"
  }
}

export default errors
