import * as winston from 'winston'
import { isMaster, worker } from 'cluster'

/**
 * class Logger
 */
export class Logger extends winston.Logger {

  /**
   * constructor
   * @param {winston.LoggerOptions} options the logger options
   */
  private constructor(options?: winston.LoggerOptions) {
    super(options)
  }

  /**
   * get logger instance
   * @return {Logger} a logger instance
   */
  public static getLogger(): Logger {
    if (!(Logger.instance instanceof Logger)) {
      const { Console } = winston.transports

      Logger.instance = new Logger()
      Logger.instance.add(Console, {
        level: 'silly',
        colorize: true,
        timestamp: true,
        prettyPrint: true
      })

      Logger.instance.filters = [
        function(level: string, message: string): string {
          let prefix: string

          if (isMaster) {
            prefix = 'master'
          } else {
            prefix = `worker-${ worker.id }`
          }

          return `[${ prefix }] ${ message }`
        }
      ]
    }

    return Logger.instance
  }

  // variables
  private static instance: Logger
}
