# StateManager

This is a simple state management library. It provides a simple interface to manage common application state scopes between site sections.

An application state is represented by an instance of a Map from Immutable.js library.
It allows different sections of site to be subscribed to a different scopes within common application state and to work only with them.

## Interface of StateManager instance:

1. registerStore - connect a specific store with a defined scope within application state.
   It is necessary for a store to implement the next interface:
      - getInitialState - initialize value of a specific scope in application state;
      - getStateScope   - an array which determines path to a scope in applicaton state (for example `['incidents']`);
      - getActions 		 - should return a map of actions which are represented in store.
Each action has to accept a state as a first parameter.
It will be a related scope from an application state which store can change.
Each action has to return new value for related scope.

	Example of store implementation:
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

2. getState - return current value of application state by specific path;
	For example to get an initialized value in react component:
		class App extends React.Component {
 			 constructor(props) {
		 		super(props);
		 		const incidents = stateManager.getState(['incidents']);
		 		this.state = { context: { incidents } }
  			}
			...
		}

3. addStateChangeListener - subscribe a component for a state changing by a specific path.
For example:
		class App extends React.Component {
			componentWillMount() {
				const { stateScope, appSectionName } = App
				stateManager.addStateChangeListener([incidents], 'App', incidents => this.setState({ incidents }))
			}
		}

4. removeStateChangeListener - unsubscirbe a component from a state changing by a specific path.
For example:
		class App extends React.Component {
			componentWillUnmount() {
				stateManager.removeStateChangeListener([incidents], 'App')
			}
		}
