import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from "react-router-dom";
import { setAuthedUser } from '../actions/authedUser'
import '../css/login.css'

class Login extends Component {

  state = {
    toHome: false,
    id: '',
  }

  setUser = (e) => {
    this.setState(() => ({
      id: e.target.value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch } = this.props

    if(this.state.id !== ''){
      dispatch(setAuthedUser(this.state.id))
      this.setState({
        toHome: true,
      })
    }else{
      alert("Select A User")
    }
  }

  render() {
    const { users } = this.props
    const { toHome } = this.state

    if (toHome) {
      return <Redirect to={'/home'} />
    }

    return (
      <div className={'loginContainer'}>
        <h2>Welcome to Would You Rather!</h2>
        <p>Select a user to enter</p>
        <div className={'loginSelector'}>
          <select onChange={this.setUser}>
            <option value={''}>
              Select a user...
            </option>
            {Object.keys(users).map((key) => (
              <option value={key} key={key}>
                {users[key].name}
              </option>
            ))}
          </select>
          <button onClick={this.handleSubmit} className={'loginBtn'}>
            Log-in
          </button>
        </div>
      </div>
    )
  }
}


function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login));