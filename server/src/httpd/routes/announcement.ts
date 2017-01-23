import { Router, Request, Response } from 'express'
import { join } from 'path'
import * as multer from 'multer'

import { authenticationJwt } from '../middlewares/authentication'
import { restrictToOwner } from '../middlewares/restrict'
import { Announcement } from '../../models/Announcement'

// ----------------------------------------------------------------------------
// variables
const router: Router = Router()
const upload = multer({ dest: join( __dirname, '../../../../client/assets' ) })

// ----------------------------------------------------------------------------
// route handler
router
  .route('/announcement')
  .get(async function(request: Request, response: Response): Promise<void> {
    try {
      let announcements = await Announcement.findAll()

      response.json({ announcements })
    } catch (error) {
      response
        .status(500)
        .json({
          error: error.message
        })
    }
  })

  .post(authenticationJwt, upload.single('image'), async function(request: Request, response: Response): Promise<void> {
    try {
      const { sub } = (request as any).payload
      const { title, description, address } = request.body

      let announcement = await Announcement.create({
        mail: sub,
        title,
        description,
        address,
        image: `${ request.file.destination }/${ request.file.filename }`
      })

      response.json({ announcement })
    } catch (error) {
      response
        .status(500)
        .json({
          error: error.message
        })
    }
  })

router
  .route('/announcement/:aid')
  .get(async function(request: Request, response: Response): Promise<void> {
    try {
      const { aid } = request.params
      let announcement = await Announcement.findOne({ where: { aid }})

      response.json({
        announcement
      })
    } catch (error) {
      response
        .status(500)
        .json({
          error: error.message
        })
    }
  })

  .put(authenticationJwt, restrictToOwner, upload.single('image'), async function(request: Request, response: Response): Promise<void> {
    try {
      const { aid } = request.params
      const { sub } = (request as any).payload
      const { title, description, address } = request.body

      await Announcement.update({
        title,
        description,
        address,
        image: `${ request.file.destination }/${ request.file.filename }`
      }, {
        where: { aid }
      })

      let announcement = await Announcement.findOne({ where: { aid }})

      response.json({ announcement })
    } catch (error) {
      response
        .status(500)
        .json({
          error: error.message
        })
    }
  })

  .delete(authenticationJwt, restrictToOwner, async function(request: Request, response: Response): Promise<void> {
    try {
      const { aid } = request.params
      let affected: number = await Announcement.destroy({ where: { aid }})

      response.json({
        affected
      })
    } catch (error) {
      response
        .status(500)
        .json({
          error: error.message
        })
    }
  })

// ----------------------------------------------------------------------------
// export
export default router
