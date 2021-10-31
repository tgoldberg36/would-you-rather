import { saveQuestion} from "../utils/api";
import { showLoading, hideLoading  } from "react-redux-loading"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

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


export function handleAddQuestion(option1, option2) {

  console.log(option1)
  
  return (dispatch, getState) => {

    const { authedUser } = getState();
    dispatch(showLoading())

    return saveQuestion({
      optionOneText: option1,
      optionTwoText: option2,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}
  