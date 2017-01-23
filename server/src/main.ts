import { Observable, Observer } from 'rxjs'

import { AsyncQueueManager } from './components/AsyncQueueManager'
import { Httpd } from './httpd/Httpd'

/**
 * function main entry point of the software
 * @return {Promise<void>} promise
 */
export function main(): Observable<void> {
  const manager: AsyncQueueManager = new AsyncQueueManager()

  manager
    .register(new Httpd())

  return manager.initialize()
}
