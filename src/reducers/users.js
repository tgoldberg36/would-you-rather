import { RECEIVE_USERS, ADD_QUESTION_TO_USER } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }

    case ADD_QUESTION_TO_USER:
      const user = action.question.author;
      const questionId = action.question.id;
      return {
        ...state,
        [user]: {
          ...state[user],
          questions: state[user].questions.concat([questionId])
        }
      };
    default :
      return state
  }
}