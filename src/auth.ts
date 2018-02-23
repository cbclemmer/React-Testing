import * as passport from 'passport'
import * as passportLocal from 'passport-local'
import { Db } from 'mongodb'
import { Express, Request, Response, NextFunction } from 'express-serve-static-core'
import { pick, omit } from 'lodash'
import User from './classes/user'

const LocalStrategy = passportLocal.Strategy

export default (db: Db) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  async (email, password, done) => {
    const users = db.collection('User')
    try {
      const user = await users.findOne({ email, password })
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' })
      }
      return done(null, user)
    } catch (e) {
      return done(e)
    }
  }))
}

export function authenticate(request: Request, response: Response, next: NextFunction): Promise<any> {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return resolve({ error: err })
      }
      if (!user) {
        return resolve({ error: info.message })
      }
      request.login(user, (error: any) => {
        if (error) {
          return resolve({ error })
        }
        resolve({
          user: pick(user, ['email', 'userName', '_id']),
          error: info ? info.message : null
        })
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
