import * as passport from 'passport'
import * as passportLocal from 'passport-local'

import { Db, ObjectId } from 'mongodb'
import { Express, Request, Response, NextFunction } from 'express-serve-static-core'
import { omit } from 'lodash'

import User from './classes/user'
import Collection from './collections'
import Procedures from './procedures'

const LocalStrategy = passportLocal.Strategy

export default (procedures: Procedures) => {
  // The serialization process makes it a string
  passport.serializeUser(({ id }, done) => {
    done(null, id)
  })

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await new User(procedures).load(new ObjectId(id))
      return done(null, user)
    } catch (e) {
      done(e, null)
    }
  })

  passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  async (email, password, done) => {
    const user = new User(procedures)
    try {
      done(null, await user.find(email, password))
    } catch (error) {
      return done(null, false, { message: error })
    }
  }))
}

export function authenticate(request: Request, response: Response, next: NextFunction): Promise<any> {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', async (err, user: User, info) => {
      if (err) {
        return resolve({ error: err })
      }
      if (!user || (info && info.message)) {
        return resolve({ error: info.message })
      }
      try {
        login(request, user)
      } catch (error) {
        return resolve({ error })
      }

      return resolve(user)
    })(request, response, next)
  })
}

export function login(request: Request, user: User): Promise<any> {
  return new Promise((resolve, reject) => {
    request.login(user, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}
