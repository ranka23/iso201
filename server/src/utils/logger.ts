import { createLogger, format, transports, Logger } from "winston"
import os from "os"
import path from "path"

const { combine, timestamp, label, printf, json, errors, metadata, splat } =
  format

const devLogger = (): Logger => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const devFormat = printf(({ level, message, timestamp, stack }) => {
    return `${"iso201 server".toUpperCase()}: ${timestamp} ${level}: ${
      message || ""
    } ${stack || ""}`
  })

  return createLogger({
    transports: [
      new transports.Console({
        level: "debug",
        format: combine(
          errors({ stack: true }),
          timestamp({ format: "HH:mm:ss.SSS" }),
          splat(),
          devFormat,
          label({ label: "iso201 server" }),
          metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
        ),
      }),
    ],
  })
}

const prodLogger = (): Logger => {
  const fileName = require?.main?.filename as string
  return createLogger({
    level: "debug",
    format: combine(
      timestamp(),
      label({ label: "iso201 server" }),
      errors({ stack: true }),
      splat(),
      json(),
      metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
    ),
    transports: [new transports.Console()],
    defaultMeta: {
      service: `${os.hostname()}_${process.pid}`,
      file: `${path.dirname(fileName)}/${path.basename(fileName)}`,
    },
  })
}

const logger = () => {
  if (process.env.NODE_ENV === "production") {
    return prodLogger()
  }
  return devLogger()
}

const log = logger()

export default log
