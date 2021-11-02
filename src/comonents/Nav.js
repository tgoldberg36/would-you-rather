import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from "../actions/authedUser";
import '../css/nav.css'
import { Redirect } from "react-router-dom";

class Nav extends Component {
  
  state = {
    toLogin: false,
  }

  handleLogOut = (e) => {
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
    this.setState(() => ({
      toLogin: true,
    }));
  }

  render () {

    if (this.props.toLogin) {
      return <Redirect to={'/'} />;
    }

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
            <button className='logOutBtn' onClick={this.handleLogOut}>Log Out</button>
            </NavLink>
          </li>
        </ul>
        ) : (
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
                Log in to ask a question
                <button className='logOutBtn'>Log In</button>
              </NavLink>
            </li>
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