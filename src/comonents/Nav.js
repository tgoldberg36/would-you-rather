import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/nav.css'

class Nav extends Component {
  render () {
    return (
      <div className='navBar'>
        {this.props.authedUser ? (
          <ul>
          <li>
            <NavLink to='/home' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' exact activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' exact activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li style={{ float : 'right'}}>
            <NavLink to='/' exact activeClassName='active'>
            {this.props.user ? this.props.user.name : null}
            <button className='logOutBtn'>Log Out</button>
            </NavLink>
          </li>
        </ul>
        ) : (
          <ul>
            <li>Log in to ask a question</li>
          </ul>
        )}
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { users, authedUser } = state
  const user = users[authedUser]
  return {
    user,
    authedUser
  }
}

export default connect(mapStateToProps)(Nav)