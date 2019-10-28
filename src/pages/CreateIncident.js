import React              from 'react'
import Form               from 'react-bootstrap/Form'
import Button             from 'react-bootstrap/Button'
import { Redirect }       from 'react-router-dom'
import { withAppContext } from '../AppContext'
import { Map }            from 'immutable'
import { Row, Col }       from 'react-bootstrap'
import './CreateIncident.scss'

export class CreateIncident extends React.Component {
  constructor(props) {
    super(props)
    const incident = Map({
      title: '',
      status: 'Created',
      assignee: '',
      description: ''
    })
    this.state = ({ incident, redirectHome: false })
  }

  render() {
    const { title, description, assignee, status, redirectHome } = this.state

    if (redirectHome) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="page-header">
          <h3 className='normal'>Create Incident</h3>
        </div>
        <Form onSubmit={this._createIncident}>
          <Row>
            <Col xs={12} sm={12} md={6}className='text-primary'>
              <Form.Group controlId="incidentTitle">
                <Form.Label>Title <span className='text-danger'>*</span></Form.Label>
                <Form.Control required type="text" placeholder="Enter incident title" value={title} onChange={this._onChangeIncident('title')}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12} md={6}className='text-primary'>
              <Form.Group controlId="incidentAssignee">
                <Form.Label>Assignee <span className='text-danger'>*</span></Form.Label>
                <Form.Control required type="text" placeholder="Enter incident assignee" value={assignee} onChange={this._onChangeIncident('assignee')}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12} md={6}className='text-primary'>
              <Form.Group controlId="incidentStatus">
                <Form.Label>Status<span className='text-danger'>*</span></Form.Label>
                <Form.Control required as="select" onChange={this._onChangeIncident('status')} value={status}>
                  <option value='Created'>Created</option>
                  <option value='Acknowledged'>Acknowledged</option>
                  <option value='Resolved'>Resolved</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12} md={6}className='text-primary'>
              <Form.Group controlId="incidentDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="5" placeholder="Enter incident description" value={description} onChange={this._onChangeIncident('description')}/>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" className='btn-sm' type='submit'>
            Create Incident
          </Button>
        </Form>
      </>
    )
  }

  _onChangeIncident = field => event => {
    const { value } = event.target
    const incident = this.state.incident.set(field, value)
    this.setState({ incident })
  }

  _createIncident = event => {
    event.preventDefault()
    const { incidentsStore } = this.props
    const { incident } = this.state

    incidentsStore.addIncident(incident)
    this.setState({ redirectHome: true })
  }
}

export default withAppContext(CreateIncident)
