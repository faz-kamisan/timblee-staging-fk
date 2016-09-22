import { SET_SELECTED_COMMENT } from '../actions/index'

const selectedComment = (state = {}, action) => {
  switch (action.type) {
    case SET_SELECTED_COMMENT:
      return action.comment
    default:
      return state
  }
}

export default selectedComment
