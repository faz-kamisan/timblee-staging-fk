import { SET_SAVING } from '../actions/index'

const saving = (state = false, action) => {
  switch (action.type) {
    case SET_SAVING:
      return action.saving
    default:
      return state
  }
}

export default saving
