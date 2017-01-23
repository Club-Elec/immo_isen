import { Router, Request, Response } from 'express'

import { User, ICrypt, generateHash } from '../../models/User'
import { UserGroup } from '../../models/UserGroup'
import { EGroup } from '../../models/Group'
import { authenticationJwt } from '../middlewares/authentication'
import { restrictToAdmin, restrictToOwner } from '../middlewares/restrict'
import { Announcement } from '../../models/Announcement'

// ----------------------------------------------------------------------------
// variables
const router: Router = Router()

// ----------------------------------------------------------------------------
// routes
router
  .route('/user')
  .all(authenticationJwt)
  .get(restrictToAdmin, async function(request: Request, response: Response): Promise<void> {
    try {
      let users = await User.findAll()

      response.json({ users })
    } catch (error) {
      response
        .status(500)
        .json({
          error: error.message
        })
    }
  })

  .post(async function(request: Request, response: Response): Promise<void> {
    try {
      const { mail, password, phone, firstname, lastname } = request.body
      const { salt, hash } = await generateHash(password)

      let user = await User.create({
        mail,
        firstname,
        lastname,
        phone,
        salt,
        hash
      })

      await UserGroup.create({
        gid: EGroup.USER,
        mail
      })

      response
        .status(201)
        .json({ user })
    } catch (error) {
      response
        .status(500)
        .json({
          error: error.message
        })
    }
  })

router
  .route('/user/:mail')
  .all(authenticationJwt)
  .get(restrictToOwner, async function(request: Request, response: Response): Promise<void> {
    try {
      const { mail } = request.params
      let user = await User.findOne({ where: { mail }})

      response.json({ user })
    } catch (error) {
      response
        .status(500)
        .json({ error: error.message })
    }
  })

  .put(restrictToOwner, async function(request: Request, response: Response): Promise<void> {
    try {
      const { mail } = request.params
      const { password, phone, firstname, lastname } = request.body

      let user: any = await User.findOne({ where: { mail }})
      let { salt, hash } = await generateHash(password, user.get('salt'))

      await User.update({
        firstname,
        lastname,
        phone,
        salt,
        hash
      }, {
        where: { mail }
      })

      user = await User.findOne({ where: { mail }})

      response.json({ user })
    } catch (error) {
      response
        .status(500)
        .json({ error: error.message })
    }
  })

  .delete(restrictToOwner, async function(request: Request, response: Response): Promise<void> {
    try {
      const { mail } = request.params

      await UserGroup.destroy({ where: { mail } })
      await Announcement.destroy({ where: { mail }})
      await User.destroy({ where: { mail }})

      response
        .status(200)
        .end()
    } catch (error) {
      response
        .status(500)
        .json({ error: error.message })
    }
  })

// ----------------------------------------------------------------------------
// export
export default router
