import { AComponent } from './AComponent'

/**
 * abstract class AManager
 */
export abstract class AManager extends AComponent {

  /**
   * constructor
   */
  public constructor() {
    super()

    this.components = []
  }

  /**
   * method register
   * @param {AComponent} component the component to register
   * @return {AManager} this
   */
  public register(component: AComponent): AManager {
    this.components.push(component)

    return this
  }

  // variables
  protected components: AComponent[]
}
