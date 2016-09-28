import { SET_CURRENT_GUEST } from '../actions/index'

const currentGuest = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_GUEST:
      return { fullName: action.name, email: action.email }
    default:
      return state
  }
}

export default currentGuest
