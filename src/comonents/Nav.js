import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/nav.css'

class Nav extends Component {
  render () {
    return (
      <div className='navBar'>
        {this.props.authedUser ? (
          <ul className={'navList'}>
          <li className={'navListElement'}>
            <NavLink to='/home' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li className={'navListElement'}>
            <NavLink to='/add' exact activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li className={'navListElement'}>
            <NavLink to='/leaderboard' exact activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li className={'navListElement'} style={{ float : 'right'}}>
            <NavLink to='/' exact activeClassName='active'>
            {this.props.user ? this.props.user.name : null}
            <button className='logOutBtn'>Log Out</button>
            </NavLink>
          </li>
        </ul>
        ) : (
          <ul className={'navList'}>
            <li className={'navListElement'}>Log in to ask a question</li>
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