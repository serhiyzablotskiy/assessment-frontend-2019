import React              from 'react'
import { withAppContext } from '../AppContext'
import { Incident }       from '../components/Incident'
import Alert              from 'react-bootstrap/Alert'
import Accordion          from 'react-bootstrap/Accordion'

export class Home extends React.Component {
  render() {
    const { incidents } = this.props

    const hasIncidents = incidents && incidents.size > 0
    if (!hasIncidents) return this._renderNoIncidents()

    return (
      <>
        <div className="page-header">
          <h3 className='normal'>List of Incidents</h3>
        </div>
        <Accordion defaultActiveKey='0'>
          { incidents.map((incident, key) => <Incident incident={ incident } key={ key } id={key}/>) }
        </Accordion>
      </>
    )
  }

  _renderNoIncidents() {
    return (
      <Alert variant='warning'>
        There are no incidents
      </Alert>
    )
  }
}

export default withAppContext(Home)
