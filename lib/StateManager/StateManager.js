import { Map } from 'immutable'
import dispatcher from './Dispatcher'

let applicationState = Map()

class StateManager {
	addStateChangeListener = (stateScope, componentName, callback) => {
		dispatcher.register(stateScope, componentName, callback)
	}

	removeStateChangeListener = (stateScope, componentName) => {
		dispatcher.undergister(stateScope, componentName)
	}

	registerStore = store => {
		const stateScope = store.getStateScope()
		const initialState = store.getInitialState()
		const actions = store.getActions()

		const createActionWithState = action => (...args) => {
			applicationState = applicationState.updateIn(stateScope, storeState =>
				action.call(store, storeState, ...args)
			)

			dispatcher.dispatch(stateScope, applicationState.getIn(stateScope))

			return applicationState
		}

		applicationState = applicationState.setIn(stateScope, initialState)
		return Object.keys(actions).reduce((memo, actionName) => {
			const action = actions[actionName]
			memo[actionName] = createActionWithState(action)
			return memo
		}, {})
	}

	getState = (stateScope = []) => applicationState.getIn(stateScope)
}

export default new StateManager();
