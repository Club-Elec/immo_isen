import { Observable } from 'rxjs'

/**
 * abstract class AComponent
 */
export abstract class AComponent {

  /**
   * method initialize
   * @return {Promise<void>}
   */
  public abstract initialize(): Observable<void>

}
