import { SET_INTRO_SLIDE_NUMBER } from '../actions/index'

const introSlideNumber = (state = 0, action) => {
  switch (action.type) {
    case SET_INTRO_SLIDE_NUMBER:
      return (action.introSlideNumber)
    default:
      return state
  }
}

export default introSlideNumber
