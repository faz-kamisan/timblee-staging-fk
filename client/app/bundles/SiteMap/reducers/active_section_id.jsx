import { CHANGE_ACTIVE_SECTION_ID } from '../actions/index'

const activeSectionId = (state = 0, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_SECTION_ID:
      return action.sectionId
    default:
      return state
  }
}

export default activeSectionId
