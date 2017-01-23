import { Router, Response, Request } from 'express'
import * as uuid from 'uuid'
import * as jwt from 'jsonwebtoken'

import { authenticationLocal } from '../middlewares/authentication'
import { User } from '../../models/User'

// ----------------------------------------------------------------------------
// variables
const router: Router = Router()

// ----------------------------------------------------------------------------
// handle route
router
  .route('/auth')
  .all(authenticationLocal)
  .post(function(request: Request, response: Response): void {
    const { mail } = request.body

    let options = {
      algorithm: 'HS512',
      expiresIn: 60 * 60 * 6,
      notBefore: '0',
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      jwtid: uuid()
    }

    let payload = {
      sub: mail,
      expirationAt: Date.now() + 60 * 60 * 6 * 1000,
      creationAt: Date.now(),
    }

    jwt.sign(payload, process.env.JWT_SECRET, options, (error, token) => {
      if (error) {
        return response
          .status(500)
          .json({
            error: error.message
          })
      }

      response.json({ token })
    })
  })

// ----------------------------------------------------------------------------
// exports
export default router
