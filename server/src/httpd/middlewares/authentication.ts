import * as jwt from 'jsonwebtoken'
import { User, generateHash } from '../../models/User'
import { Request, Response, NextFunction } from 'express'

export function authenticationJwt(request: Request, response: Response, next: NextFunction): void {
  let {authorization} = request.headers;
  if (!/^JWT [\w\d\.\-_]+$/.test(authorization)) {
    response
      .status(401)
      .json({
        error: 'Wrong authorization'
      });

    return;
  }

  let options = {
    algorithms: ['HS256', 'HS358', 'HS512'],
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    ignoreExpiration: false,
    clockTolerance: 0
  };

  authorization = authorization.substr(4)
  jwt.verify(authorization, process.env.JWT_SECRET, options, (error, payload) => {
    if (error) {
      return response
        .status(500)
        .json({
          error: error.message
        })
    }

    if (Date.now() >= payload.expirationAt) {
      return response
        .status(401)
        .json({
          error: 'Expiration date'
        });
    }

    (request as any).payload = payload

    next();
  });
}

export async function authenticationLocal(request: Request, response: Response, next: NextFunction): Promise<void> {
  const { mail, password } = request.body;

  if (!mail || !password) {
    response
      .status(401)
      .json({
        error: 'Wrong identifier'
      });

    return
  }

  try {
    let user: any = await User.findOne({ where: { mail }})
    let { hash } = await generateHash(password, user.get('salt'))

    if (user.get('hash') !== hash) {
      response
        .status(401)
        .json({
          error: 'Password is invalid'
        })

      return
    }

    next()
  } catch (error) {
    response
      .status(500)
      .json({
        error: error.message
      })
  }
}
