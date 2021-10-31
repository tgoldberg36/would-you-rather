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
    questionCategory: 'Unanswered Questions',
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
          <button className={'dashBoardBtn'} onClick={this.handleQuestionCategory} value={'Unanswered Questions'}>Unanswered Questions</button>
          <button className={'dashBoardBtn'} onClick={this.handleQuestionCategory} value={'Answered Questions'}>Answered Questions</button>
        </div>
        <div className={'questionContainer'}>
          { questionCategory === 'Unanswered Questions' && 
            <ul className={'questionList'}>
              { unanswered.map((q) => 
              <li className={'question'}>
                <Question id={q.id} />
              </li>)}
            </ul>}
          { questionCategory === 'Answered Questions' && 
            <ul className={'questionList'}>
              { answered.map((q) => 
              <li className={'question'}>
                <Question id={q.id} />
              </li>)}
            </ul>}
        </div>
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