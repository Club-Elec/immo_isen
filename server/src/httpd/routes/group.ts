import { Router, Response, Request } from 'express'

import { Group } from '../../models/Group'
import { authenticationJwt } from '../middlewares/authentication'

// ----------------------------------------------------------------------------
// variables
const router: Router = Router()

// ----------------------------------------------------------------------------
// route
router
  .route('/group')
  .all(authenticationJwt)
  .get(async function(request: Request, response: Response): Promise<void> {
    try {
      let groups = await Group.findAll()

      response.json({ groups })
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
