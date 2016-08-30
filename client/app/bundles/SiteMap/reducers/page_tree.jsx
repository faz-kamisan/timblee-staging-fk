import { ADD_NEW_PAGE, REMOVE_PAGE, UPDATE_PAGE_NAME, UPDATE_PAGE_POSITION, CHANGE_COLLAPSE } from '../actions/index'
import { addPage, removePage, updatePagePosition, updatePageName, updateCollapse } from '../helpers/tree_helper'

const pageTree = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_PAGE:
      return addPage(state, action.pageTypeId, action.parentId, action.position)
    case REMOVE_PAGE:
      return removePage(state, action.id)
    case UPDATE_PAGE_POSITION:
      return updatePagePosition(state, action.id, action.newParentId, action.position)
    case UPDATE_PAGE_NAME:
      return updatePageName(state, action.id, action.name)
    case CHANGE_COLLAPSE:
      return updateCollapse(state, action.id)
    default:
      return state
  }
}

export default pageTree
