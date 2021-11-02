import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/leaderboard.css'

class Leaderboard extends Component {
  render() {
    const { users, leaderboard } = this.props

    return (
      <div className="leaderboardContainer">
        <h2>Leaderboard</h2>
        {leaderboard.sort((a, b) => b.totalPoints - a.totalPoints).map(user => (
          <div key={user.id}>
            <div className="profilePicContainer">
              <h3 className="user">
                {`${users[user.id].name}`}
              </h3>
              <img
                src={users[user.id].avatarURL}
                alt={`Avatar of ${users[user.id].avatarURL}`}
              />
              <div>
                <p>Questions answered: {Object.keys(users[user.id].answers).length}</p>
                <p>Questions asked: {users[user.id].questions.length}</p>
                <h4>{user.totalPoints} Points</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}



function mapStateToProps({ users }) {
  const userIds = Object.keys(users)
  const leaderboard = userIds.map(id => ({
    id: id,
    totalPoints:
      Object.keys(users[id].answers).length +
      users[id].questions.length
  }))

  return {
    leaderboard,
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)