import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from "react-router-dom";
import '../css/login.css'

class Login extends Component {

  state = {
    toHome: false,
    id: null,
  }

  handleChange = (e) => {

  }

  handleSubmit = (e) => {
    
  }

  render() {
    const { users } = this.props

    return (
      <div className={'loginContainer'}>
        <h2>Welcome to Would You Rather!</h2>
        <p>Select a user to login</p>
        <div className={'loginSelector'}>
          <select >
            <option disabled value="-1">
              Select a user...
            </option>
            {Object.keys(users).map((key) => (
              <option value={key} key={key}>
                {users[key].name}
              </option>
            ))}
          </select>
          <button>
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