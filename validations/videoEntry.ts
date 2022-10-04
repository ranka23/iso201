import errors from "../constants/errors"

export const validateVideoEntry = (data: VideoEntry = {}): {
  error: ErrorRes
  status: number
} => {
  if (!data) {
    return {
      error: errors.video_details_required,
      status: 400
    }
  }
  const {
    bitrate,
    duration,
    fname,
    fps,
    mime,
    scale,
    size,
    tags,
    title,
    type,
  } = data

  let error = {
    code: "",
    message: "",
  }
  let status = 200

  if (!bitrate) {
    error = errors.bitrate_required
    status = 400
  }

  if (!duration) {
    error = errors.duration_required
    status = 400
  }

  if (!fname) {
    error = errors.file_name_required
    status = 400
  }

  if (!fps) {
    error = errors.fps_required
    status = 400
  }

  if (!mime) {
    error = errors.file_type_mime_required
    status = 400
  }

  if (!scale) {
    error = errors.scale_required
    status = 400
  }

  if (!size) {
    error = errors.file_size_required
    status = 400
  }

  if (!tags) {
    error = errors.tags_required
    status = 400
  }

  if (!title) {
    error = errors.title_required
    status = 400
  }

  if (!type) {
    error = errors.type_required
    status = 400
  }

  return {
    error,
    status,
  }
}
