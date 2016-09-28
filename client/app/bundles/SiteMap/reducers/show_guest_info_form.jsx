import { SET_SHOW_GUEST_INFO_FORM } from '../actions/index'

const showGuestInfoForm = (state = false, action) => {
  switch (action.type) {
    case SET_SHOW_GUEST_INFO_FORM:
      return action.showGuestInfoForm
    default:
      return state
  }
}

export default showGuestInfoForm
