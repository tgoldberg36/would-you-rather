import { RECEIVE_USERS, ADD_QUESTION_TO_USER, USER_ANSWER_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }

    case ADD_QUESTION_TO_USER:
      const user = action.question.author
      const questionId = action.question.id
      return {
        ...state,
        [user]: {
          ...state[user],
          questions: state[user].questions.concat([questionId])
        }
      }

      case USER_ANSWER_QUESTION:
        const { authedUser, qid, answer } = action
        return {
          ...state,
          [authedUser]: {
            ...state[authedUser],
            answers: {
              ...state[authedUser].answers,
              [qid]: answer
            }
          }
        }
    default :
      return state
  }
}