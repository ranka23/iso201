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
      "Unable to verify your payment status. If the amount has been deducted on your end, please reach out to us via email at payments@iso201.com",
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
    message: "Route not found.",
  },
  invoiceID_not_provided: {
    code: "invoiceID_not_provided",
    message: "Cannot proceed with an invoice ID",
  },
  currency_not_provided: {
    code: "currency_not_provided",
    message: "Cannot proceed without currency",
  },
  currency_not_available: {
    code: "currency_not_available",
    message: "Provided currency is not available",
  },
  failed_to_save_video_entry_in_db: {
    code: "failed_to_save_video_entry_in_db",
    message: "Failed to save video entry in Database.",
  },
  video_details_required: {
    code: "video_details_required",
    message: "Video details required",
  },
  bitrate_required: {
    code: "bitrate_required",
    message: "Bit rate required",
  },
  duration_required: {
    code: "duration_required",
    message: "Duration required",
  },
  file_name_required: {
    code: "file_name_required",
    message: "File name required",
  },
  fps_required: {
    code: "fps_required",
    message: "FPS required",
  },
  file_type_mime_required: {
    code: "file_type_mime_required",
    message: "File Type MIME required",
  },
  file_size_required: {
    code: "file_size_required",
    message: "File size required",
  },
  tags_required: {
    code: "tags_required",
    message: "Tags required",
  },
  title_required: {
    code: "title_required",
    message: "Title required",
  },
  type_required: {
    code: "type_required",
    message: "File type required",
  },
  scale_required: {
    code: "scale_required",
    message: "File dimensions required",
  },
  request_not_found: {
    code: "request_not_found",
    message: "Request not found",
  },
  unauthorized_access: {
    code: "request_not_found",
    message: "Unauthorized access to resource",
  },
  assets_not_found: {
    code: "assets_not_found",
    message: "No Assets found for your search.",
  },
  asset_already_exists: {
    code: "asset_already_exits",
    message: "Asset already exits",
  },
  failed_to_upload_image: {
    code: "failed_to_upload_image",
    message: "Failed to upload image asset to server",
  },
  failed_to_update_asset: {
    code: "failed_to_update_asset",
    message: "Failed to update the asset"
  },
  asset_id_not_found: {
    code: "asset_id_not_found",
    message: "Asset ID required."
  }
}

export default errors
