import { List, fromJS } from 'immutable'
import stateManager from '../../lib/StateManager'

class IncidentsStore {
	getInitialState = () => List()
	getStateScope = () => ['incidents']
	getActions = () => ({ addIncident: this.addIncident })

	addIncident(state, incident) {
		return state.push(fromJS(incident))
	}
}

export default stateManager.registerStore(new IncidentsStore())
