import { Request } from "express";
import { Client as PGClient } from 'pg'
import { Client as ESClient } from '@elastic/elasticsearch'

export const getPG = (req: Request) => {
  return req.app.locals.pg as PGClient;
}

export const getES = (req: Request) => {
  return req.app.locals.es as ESClient
}

