import { SET_PAGE_TO_DELETE } from '../actions/index'

const pageToDelete = (state = {}, action) => {
  switch (action.type) {
    case SET_PAGE_TO_DELETE:
      return action.page
    default:
      return state
  }
}

export default pageToDelete
