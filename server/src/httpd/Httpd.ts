import { Observable, Observer } from 'rxjs'
import * as express from 'express'
import { json, urlencoded } from 'body-parser'
import * as compression from 'compression'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as method from 'method-override'

import { AComponent } from '../components/AComponent'
import { logger } from './middlewares/logger'

/**
 * class Httpd
 */
export class Httpd extends AComponent {

  /**
   * constructor
   */
  public constructor() {
    super()

    this.httpd = express()
  }

  /**
   * method initialize
   * @return {Observable<void>} an Observable instance
   */
  public initialize(): Observable<void> {
    return Observable.create((observer: Observer<void>): void => {
      this.httpd
        .use(method())
        .use(cors())
        .use(helmet())
        .use(compression())
        .use(json())
        .use(urlencoded({ extended: true }))
        .use(logger)

      let routes: string[] = [
        'announcement',
        'group',
        'user',
        'auth'
      ]

      for (const route of routes) {
        this.httpd.use('/api', require(`./routes/${ route }`).default)
      }

      try {
        this.httpd.listen(process.env.PORT || 80, observer.complete.bind(observer))
      } catch (error) {
        observer.error(error)
      }
    })
  }

  // variable
  private httpd: express.Application
}
