import classNames                    from 'classnames'
import React, { Component }          from 'react'
import { Row, Card, Accordion, Col } from 'react-bootstrap'

export class Incident extends Component {
  render () {
    const { incident, id } = this.props
    const title = incident.get('title')
    const assignee = incident.get('assignee')
    const status = incident.get('status')
    const description = incident.get('description')

    const statusClassName = classNames({
      'text-danger':  status === 'Created',
      'text-primary': status === 'Acknowledged',
      'text-success': status === 'Resolved'
    })
    const hasDescription = description && description.length > 0

    return (
      <Card bg="light">
        <Accordion.Toggle as={ Card.Header } style={{ cursor: 'pointer' }} variant="link" eventKey={ id }>
          { title }
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={ id }>
          <Card.Body className='small'>
            <Row>
              <Col xs={6} sm={4} md={2} className='text-secondary'>Assignee:</Col>
              <Col xs={6} sm={8} md={10}className='text-primary'>{ assignee }</Col>
            </Row>
            <Row>
              <Col xs={6} sm={4} md={2} className='text-secondary'>Status:</Col>
              <Col xs={6} sm={8} md={10} className={statusClassName}>{ status }</Col>
            </Row>
            {
              hasDescription && (
                <>
                  <hr />
                  <Row>
                    <Col xs={12} className='text-secondary'>Description:</Col>
                    <Col xs={12} className='text-success'>{ description }</Col>
                  </Row>
                </>
              )
            }

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}
