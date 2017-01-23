import { isMaster, fork, Worker, Address } from 'cluster'
import { Socket, Server } from 'net'
import { cpus } from 'os'
import { validate, ValidationError } from 'joi'
import { Observable } from 'rxjs'

import { main } from './main'
import { Logger } from './components/Logger'
import { Configuration, IConfiguration } from './models/Configuration'

const logger: Logger = Logger.getLogger()

if (isMaster) {
  function registerWorkerEvent(worker: Worker) {
    worker.addListener('disconnect', function(): void {
      logger.info(`Worker ${ worker.id } has disconnected`)
    })

    worker.addListener('error', function(code: number, signal: string): void {
      if (code) {
        logger.error(`Worker ${ worker.id } has exited with code ${ code }`)
      } else {
        logger.error(`Worker ${ worker.id } has exited with signal ${ signal }`)
      }
    })

    worker.addListener('exit', function(code: number, signal: string): void {
      if (code) {
        logger.error(`Worker ${ worker.id } has exited with code ${ code }`)
      } else {
        logger.error(`Worker ${ worker.id } has exited with signal ${ signal }`)
      }
    })

    worker.addListener('listening', function(address: Address): void {
      logger.info(`Worker ${ worker.id } is listening at ${ address.port }`)
    })

    worker.addListener('message', function(message: any, handle: Socket | Server): void {
      logger.info(`Worker ${ worker.id } receive a message`)
    })

    worker.addListener('online', function(): void {
      logger.info(`Worker ${ worker.id } is online`)
    })
  }

  validate(process.env, Configuration, { allowUnknown: true }, (error: ValidationError, env: IConfiguration): void => {
    if (error) {
      logger.error(error.message)

      return
    }

    for (let i = 0, n = cpus().length; i < n; ++i) {
      registerWorkerEvent(fork())
    }
  })
} else {
  const start: number = Date.now()
  const main$: Observable<void> = main()

  main$.subscribe({
    error(error: Error) {
      logger.error(error.message)
    },

    complete() {
      let end: number = Date.now()

      logger.info(`Application start in ${ end - start } ms`)
    }
  })
}
