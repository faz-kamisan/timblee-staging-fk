import { SET_MAX_PAGE_UID } from '../actions/index'

const maxPageUid = (state = 0, action) => {
  switch (action.type) {
    case SET_MAX_PAGE_UID:
      return action.uid
    default:
      return state
  }
}

export default maxPageUid
