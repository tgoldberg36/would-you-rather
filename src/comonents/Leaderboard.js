import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/leaderboard.css'

class Leaderboard extends Component {
  render() {
    const { users, leaderboardPlacements } = this.props

    console.log(leaderboardPlacements)

    return (
      <div className="leaderboardContainer">
        <h2>Leaderboard</h2>
        {leaderboardPlacements.sort((a, b) => b.points - a.points).map(user => (
          <div key={user.id}>
            <div className="profilePicContainer">
              <h3 className="user">
                {`${users[user.id].name}`}
              </h3>
              <img
                src={users[user.id].avatarURL}
                alt={`Avatar of ${users[user.id].avatarURL}`}
              />
              <h4>{user.totalPoints} Points</h4>
              <p>Questions answered: {Object.keys(users[user.id].answers).length}</p>
              <p>Questions asked: {Object.keys(users[user.id].questions).length}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}



function mapStateToProps({ users }) {
  const userIds = Object.keys(users)
  const leaderboardPlacements = userIds.map(id => ({
    id: id,
    totalPoints:
      Object.keys(users[id].answers).length +
      Object.keys(users[id].questions).length
  }))

  return {
    leaderboardPlacements,
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)