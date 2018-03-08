import * as passport from 'passport'

import { Express } from 'express-serve-static-core'

import Procedures from '../procedures'
import userRoutes from './user'
import tweetRoutes from './tweet'

export default (app: Express, procedures: Procedures) => {
  userRoutes(app, procedures)
  tweetRoutes(app, procedures)
}
