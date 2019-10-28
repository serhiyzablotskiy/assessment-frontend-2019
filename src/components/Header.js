import React    from 'react'
import Nav      from 'react-bootstrap/Nav'
import './Header.scss'
import { Link } from 'react-router-dom'

export class Header extends React.Component {
  render() {
    const { location } = this.props
    const { pathname: activeKey } = location

    return (
      <Nav variant="pills" defaultActiveKey="/" activeKey={activeKey} className='nav-bar small'>
        <Nav.Item>
          <Nav.Link tag={Link} href="/" onSelect={this._navigateTo('/')}>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link tag={Link} href="/create" onSelect={this._navigateTo('create')}>Create</Nav.Link>
        </Nav.Item>
      </Nav>
    )
  }

  _navigateTo = path => (_, e) => {
    e.preventDefault()
    this.props.history.push(path)
  }
}
