import React, { Component, Fragment } from 'react'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount() {
   this.props.dispatch(handleInitialData())
  }

  render(){
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.loading === true 
            ? null
            : <div>
              <Route path='/' exact component={Leaderboard} />
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
