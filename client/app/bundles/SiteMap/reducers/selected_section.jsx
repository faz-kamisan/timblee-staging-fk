import { SET_SELECTED_SECTION } from '../actions/index'

const selectedSection = (state = {}, action) => {
  switch (action.type) {
    case SET_SELECTED_SECTION:
      return action.section
    default:
      return state
  }
}

export default selectedSection
