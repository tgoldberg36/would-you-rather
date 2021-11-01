import { getInitialData, saveQuestionAnswer } from '../utils/api'
import { receiveUsers, userAnswerQuestion } from '../actions/users'
import { receiveQuestions, answerQuestion } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData (userID) {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(userID ? userID : null))
        dispatch(hideLoading())
      })
  }
}

export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer(info)
      .then(() => {
        dispatch(userAnswerQuestion(info))
        dispatch(answerQuestion(info))
        dispatch(hideLoading())
    })
  }
}