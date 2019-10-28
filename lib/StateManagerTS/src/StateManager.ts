import { Map, List } from 'immutable'
import dispatcher, { ListenerCallback } from './Dispatcher'

let applicationState = Map()

type ObjectWithStringKeys = { [key: string]: any; };
type StoreAction = (state: List<any>|Map<string, any>, ...args: any[]) => List<any>|Map<string, any>;

interface IStore {
  getStateScope(): string[];
  getInitialState(): Map<string, any>|List<any>;
  getActions(): ObjectWithStringKeys;
};

class StateManager {
  addStateChangeListener = (stateScope: string[], componentName: string, callback: ListenerCallback) : void => {
    dispatcher.register(stateScope, componentName, callback)
  }

  removeStateChangeListener = (stateScope: string[], componentName: string) : void => {
    dispatcher.undergister(stateScope, componentName)
  }

  registerStore(store: IStore): ObjectWithStringKeys {
    const stateScope = store.getStateScope()
    const initialState = store.getInitialState()
    const actions = store.getActions()

    const createActionWithState = (action: StoreAction) => (...args: any) => {
      applicationState = applicationState.updateIn(stateScope, storeState =>
        action.call(store, storeState, ...args)
      )

      dispatcher.dispatch(stateScope, applicationState.getIn(stateScope))

      return applicationState
    }

    applicationState = applicationState.setIn(stateScope, initialState)

    const initialValue: ObjectWithStringKeys = {};
    const actionNames = Object.keys(actions)
    const result = actionNames.reduce((memo, actionName) => {
      const action = actions[actionName]
      memo[actionName] = createActionWithState(action)
      return memo
    }, initialValue)
    return result
  }

  getState = (stateScope: any = []) => applicationState.getIn(stateScope)
}

export default new StateManager();
