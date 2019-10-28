import React                                      from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreateIncident                             from './pages/CreateIncident'
import Home                                       from './pages/Home'
import { Header }                                 from './components/Header'
import Container                                  from 'react-bootstrap/Container'
import { AppContext }                             from './AppContext'
import history                                    from './browserHistory'
import stateManager                               from './lib/StateManager'

class App extends React.Component {
  static appSectionName = 'Incidents'
  static stateScope = ['incidents']

  constructor(props) {
    super(props)

    const { incidentsStore } = props.stores
    const incidents = stateManager.getState(App.stateScope);
    this.state = { context: { incidentsStore, incidents, history } }
  }

  onIncidentsChanged = incidents => {
    const context = { ...this.state.context, incidents }
    this.setState({ context })
  }

  componentWillMount() {
    const { stateScope, appSectionName } = App
    stateManager.addStateChangeListener(stateScope, appSectionName, this.onIncidentsChanged)
  }

  componentWillUnmount() {
    const { stateScope, appSectionName } = App
    stateManager.removeStateChangeListener(stateScope, appSectionName)
  }

  render() {
    const { context } = this.state

    return (
      <AppContext.Provider value={context}>
        <Router history={history}>
          <div className="App">
            <Container>
              <Route path="/(create)?" component={ Header }/>
              <div>
              <Switch>
                <Route exact path="/" component={ Home }/>
                <Route exact path="/create" component={ CreateIncident }/>
               </Switch>
              </div>
            </Container>
          </div>

        </Router>
      </AppContext.Provider>
    )
  }

}

export default App
