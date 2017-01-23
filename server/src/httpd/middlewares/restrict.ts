import { Request, Response, NextFunction } from 'express'

import { UserGroup } from '../../models/UserGroup'
import { Announcement } from '../../models/Announcement'
import { EGroup } from '../../models/Group'

export async function restrictToAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {
  const { sub } = (request as any).payload

  try {
    let admin = await UserGroup.findOne({ where: { mail: sub, gid: EGroup.ADMIN }})

    if (!admin) {
      response
        .status(401)
        .end()

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

export async function restrictToOwner(request: Request, response: Response, next: NextFunction): Promise<void> {
  const { sub } = (request as any).payload
  let mail = request.body.mail || request.params.mail

  try {
    if (!mail && request.params.aid) {
      let announcement: any = await Announcement.findOne({ where: { aid: request.params.aid }})

      mail = announcement.get('mail')
    }

    if (mail === sub) {
      return next()
    }

    let admin = await UserGroup.findOne({ where: { mail: sub, gid: EGroup.ADMIN }})

    if (!admin) {
      response
        .status(401)
        .end()

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
