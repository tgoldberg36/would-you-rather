import React, { Component, Fragment } from 'react'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Dashboard from './Dashboard'
import CreateQuestion from './CreateQuestion'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
   this.props.dispatch(handleInitialData())
  }

  render(){
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Nav />
          {this.props.loading === true 
            ? null
            : <div>
              <Route path='/' exact component={Login} />
              <Route path='/home' exact component={Dashboard} />
              <Route path='/add' exact component={CreateQuestion} />
              <Route path='/leaderboard' exact component={Leaderboard} />
            </div>
          }
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ loadingBar }) {
  return {
    loading: loadingBar > 0
  }
}

export default connect(mapStateToProps)(App)
