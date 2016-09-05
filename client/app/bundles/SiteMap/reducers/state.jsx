import { CHANGE_STATE } from '../actions/index'

const state = (state = '', action) => {
  switch (action.type) {
    case CHANGE_STATE:
      return action.state
    default:
      return state
  }
}

export default state
