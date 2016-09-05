import { ADD_NEW_PAGE, REMOVE_PAGE, UPDATE_PAGE_NAME, UPDATE_PAGE_POSITION, CHANGE_COLLAPSE, UPDATE_ID } from '../actions/index'
import { addPage, removePage, updatePagePosition, updatePageName, updateCollapse, updatePageId } from '../helpers/tree_helper'

const sections = (state = [], action) => {
  switch (action.type) {
    case ADD_NEW_PAGE:
      return addPage(state, action.sectionId, action.pageType, action.parentId, action.position, action.timeStamp)
    case REMOVE_PAGE:
      return removePage(state, action.id, action.sectionId)
    case UPDATE_PAGE_POSITION:
      return updatePagePosition(state, action.id, action.sectionId, action.newParentId, action.position)
    case UPDATE_PAGE_NAME:
      return updatePageName(state, action.id, action.sectionId, action.name)
    case CHANGE_COLLAPSE:
      return updateCollapse(state, action.id, action.sectionId)
    case UPDATE_ID:
      return updatePageId(state, action.id, action.sectionId, action.newId)
    default:
      return state
  }
}

export default sections
