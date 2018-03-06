import * as passport from 'passport'
import * as passportLocal from 'passport-local'

import { Db, ObjectId } from 'mongodb'
import { Express, Request, Response, NextFunction } from 'express-serve-static-core'
import { pick, omit } from 'lodash'

import User from './classes/user'
import Collection from './collections'
import Procedures from './procedures'

const LocalStrategy = passportLocal.Strategy

export default (procedures: Procedures) => {
  passport.serializeUser(({ id }, done) => {
    done(null, id)
  })

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await procedures.user_get_dbId(id)
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
    await user.find(email, password)
    if (user.error) {
      return done(null, false, { message: user.error })
    }
    return done(null, user)
  }))
}

export function authenticate(request: Request, response: Response, next: NextFunction): Promise<any> {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', async (err, user: User, info) => {
      if (err) {
        return resolve({ error: err })
      }
      if (!user) {
        return resolve({ error: info.message })
      }
      const error = await login(request, user)
      if (error) {
        return resolve({ error })
      }
      resolve({
        user: user.safeData,
        error: info ? info.message : null
      })
    })(request, response, next)
  })
}

export function login(request: Request, user: User): Promise<any> {
  return new Promise((resolve, reject) => {
    request.login(user, (err) => {
      resolve(err)
    })
  })
}
