import { saveQuestion } from "../utils/api";
import { addQuestionToUser } from './users'
import { showLoading, hideLoading  } from "react-redux-loading"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function answerQuestion ( { authedUser, qid, answer} ) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}


export function handleAddQuestion(option1, option2) {
  return (dispatch, getState) => {

    const { authedUser } = getState();
    dispatch(showLoading())

    return saveQuestion({
      optionOneText: option1,
      optionTwoText: option2,
      author: authedUser,
    })
    .then((res) => {
      dispatch(addQuestion(res))
      dispatch(addQuestionToUser(res))
      dispatch(hideLoading())
    })
  }
}
  