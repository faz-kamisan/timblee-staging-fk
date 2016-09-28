import { SET_SELECTED_PAGE } from '../actions/index'

const selectedPage = (state = {}, action) => {
  switch (action.type) {
    case SET_SELECTED_PAGE:
      return action.page
    default:
      return state
  }
}

export default selectedPage
