import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import '../css/dashboard.css'

function getUnansweredQuestions(questions, authedUser){
  return (
    questions.filter((q) => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser))
  )
}

function getAnsweredQuestions(questions, authedUser){
  return (
    questions.filter((q) => !q.optionOne.votes.includes(authedUser) && !q.optionTwo.votes.includes(authedUser))
  )
}


class Dashboard extends Component {

  state = {
    questionCategory: 'Unanswered',
  }

  handleQuestionCategory = e => {
    const questionCategory = e.target.value

    this.setState(() => ({
      questionCategory
    }))
  }

  render() {
    const { questionCategory } = this.state
    const { authedUser, questions } = this.props

    const answered = getUnansweredQuestions(Object.values(questions), authedUser)
    const unanswered = getAnsweredQuestions(Object.values(questions), authedUser)

    return (
      <div className={'dashboardContainer'}>
        <div className={'btnContainer'}>
          <button className={'dashBoardBtn'} onClick={this.handleQuestionCategory} value={'Unanswered'}>Unanswered Questions</button>
          <button className={'dashBoardBtn'} onClick={this.handleQuestionCategory} value={'Answered'}>Answered Questions</button>
        </div>
        { questionCategory === 'Unanswered' && 
          <ul className={'questionList'}>
            { unanswered.sort((a, b) => b.timestamp - a.timestamp).map((q) => 
            <li key={q.id} className={'question'}>
              <Question id={q.id} />
            </li>)}
          </ul>}
        { questionCategory === 'Answered' && 
          <ul className={'questionList'}>
            { answered.sort((a, b) => b.timestamp - a.timestamp).map((q) => 
            <li key={q.id} className={'question'}>
              <Question id={q.id} />
            </li>)}
          </ul>}
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { authedUser, questions } = state
  return {
    authedUser,
    questions,
  }
}

export default connect(mapStateToProps)(Dashboard)