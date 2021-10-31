import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { handleInitialData } from './shared'
import { showLoading, hideLoading  } from "react-redux-loading"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function handleSaveQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading())

    return _saveQuestion({
      ...info,
      author: info.authedUser
    })
    .then(res => dispatch(handleInitialData(res.author)))
    .then(() => dispatch(hideLoading()))
  }
}

export function handleSaveQuestionAnswer(answer) {
  return dispatch => {
    dispatch(showLoading())

    return _saveQuestionAnswer({
      ...answer
    })
      .then(() => dispatch(handleInitialData(answer.authedUser)))
      .then(() => dispatch(hideLoading()))
  }
}
  