import { CHANGE_LEFT_SIDEBAR_EXPANDED } from '../actions/index'

const leftSidebarExpanded = (state = true, action) => {
  switch (action.type) {
    case CHANGE_LEFT_SIDEBAR_EXPANDED:
      return action.expanded
    default:
      return state
  }
}

export default leftSidebarExpanded
