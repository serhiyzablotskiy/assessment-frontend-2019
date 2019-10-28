import { Map } from 'immutable'
import { EventEmitter } from 'events'

let eventHandlers = Map()

class Dispatcher extends EventEmitter {
	register(subscribedStateScope, componentName, callback) {
		const eventHandler = (changedStateScope, state) => {
			const isSubscribedScope = this._isScopesEqual(subscribedStateScope, changedStateScope)
			if (isSubscribedScope) callback(state)
		}
		eventHandlers.setIn([...subscribedStateScope, componentName], eventHandler)
		this.on('change', eventHandler)
	}

	undergister(subscribedStateScope, componentName) {
		const eventHandler = eventHandlers.getIn([...subscribedStateScope, componentName])
		if (eventHandler) {
			this.off('change', eventHandler)
			eventHandlers = eventHandlers.removeIn([...subscribedStateScope, componentName])
		}
	}

	dispatch(stateScope, state) {
	  this.emit('change', stateScope, state)
	}

	_isScopesEqual(scope1, scope2) {
		if (scope1.length !== scope2.length) return false
		return scope1.every(key => scope2.includes(key))
	}
}

export default new Dispatcher()
