import { SET_NAME } from '../actions/index'

const name = (state = '', action) => {
  switch (action.type) {
    case SET_NAME:
      return action.name
    default:
      return state
  }
}

export default name
