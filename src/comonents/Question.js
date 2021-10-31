import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/question.css'

class Question extends Component {
  render() {
    const { question, user, questionId } = this.props

    return (
      <div className={'questionContainer'}>
        <div className={'header'}>
          <h4>{`${user.name} asks...`}</h4>
          <img src={user.avatarURL} alt="avatar!" className="avatar" />
        </div>
        <div className={'body'}>
          <h5>Would you rather:</h5>
            <p>A: {question.optionOne.text}</p>
            <p>B: {question.optionTwo.text}</p>
        </div>
      </div>
    )
  }
}


function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id]
  const questionId = question.id
  const user = users[question.author]

  return {
    question,
    questionId,
    user
  }
}

export default connect(mapStateToProps)(Question)