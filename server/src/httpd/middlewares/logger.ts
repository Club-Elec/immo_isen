import { Request, Response, NextFunction } from 'express'

import { Logger } from '../../components/Logger'

export function logger(request: Request, response: Response, next: NextFunction): void {
  const start: number = Date.now()

  response.addListener('finish', function() {
    const { method, httpVersion, protocol, url } = request
    const { statusCode } = response
    const end: number = Date.now()
    const logger: Logger = Logger.getLogger()

    logger.silly(`${ protocol.toUpperCase() } ${ httpVersion } ${ method.toUpperCase() } ${ statusCode } - ${ url } - ${ end - start } ms`)
  })

  next()
}
