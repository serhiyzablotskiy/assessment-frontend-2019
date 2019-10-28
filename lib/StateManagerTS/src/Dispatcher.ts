import { List, Map } from 'immutable';
import { EventEmitter } from 'events';

let eventHandlers: Map<string, any> = Map()

export type ListenerCallback = (state: List<any>|Map<string, any>) => void;

class Dispatcher extends EventEmitter {
  register(subscribedStateScope: string[], componentName: string, callback: ListenerCallback) {
    const eventHandler = (changedStateScope: string[], state: Map<string, any>) => {
      const isSubscribedScope: boolean = this._isScopesEqual(subscribedStateScope, changedStateScope)
      if (isSubscribedScope) callback(state)
    }
    eventHandlers.setIn([...subscribedStateScope, componentName], eventHandler)
    this.on('change', eventHandler)
  }

  undergister(subscribedStateScope: string[], componentName: string) {
    const eventHandler = eventHandlers.getIn([...subscribedStateScope, componentName])
    if (eventHandler) {
      this.off('change', eventHandler)
      eventHandlers = eventHandlers.removeIn([...subscribedStateScope, componentName])
    }
  }

  dispatch(stateScope: string[], state: Map<string, any>) {
    this.emit('change', stateScope, state)
  }

  _isScopesEqual(scope1: string[], scope2: string[]): boolean {
    if (scope1.length !== scope2.length) return false
    return scope1.every(key => scope2.includes(key))
  }
}

export default new Dispatcher();
