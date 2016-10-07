import { INCREMENT_INTRO_SLIDE_NUMBER } from '../actions/index'

const introSlideNumber = (state = 1, action) => {
  switch (action.type) {
    case INCREMENT_INTRO_SLIDE_NUMBER:
      return (state + 1)
    default:
      return state
  }
}

export default introSlideNumber
