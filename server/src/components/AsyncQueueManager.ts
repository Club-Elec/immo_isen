import { AManager } from './AManager'
import { AComponent } from './AComponent'
import { Observable, Observer } from 'rxjs'
import { queue } from 'async'

/**
 * class AsyncQueueManager
 */
export class AsyncQueueManager extends AManager {

  /**
   * method initialize
   * @return {Observable<void} the observable object
   */
  public initialize(): Observable<void> {
    return Observable.create((observer: Observer<void>) => {
      if (this.components.length === 0) {
        return observer.complete()
      }

      const q: AsyncQueue<AComponent> = queue<AComponent, Error>((component: AComponent, done: ErrorCallback<Error>): void => {
        const component$: Observable<void> = component.initialize()

        component$.subscribe({
          next: observer.next,
          error: done,
          complete: done
        })
      }, 1)

      q.drain = observer.complete.bind(observer)

      for (const component of this.components) {
        q.push(component, (error): void => {
          if (error) {
            observer.error(error)
          }
        })
      }
    })
  }
}
