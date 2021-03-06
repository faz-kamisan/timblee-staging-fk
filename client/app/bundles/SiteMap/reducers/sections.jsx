import { ADD_NEW_PAGE, REMOVE_PAGE, UPDATE_PAGE_NAME, UPDATE_PAGE_PERSISTENCE, UPDATE_PAGE_POSITION, CHANGE_COLLAPSE, UPDATE_ID, ADD_PAGE_COMMENT, UPDATE_PAGE_COMMENT_ID, UPDATE_PAGE_COMMENT, DELETE_PAGE_COMMENT, DELETE_PAGE, CHANGE_PAGE_TYPE, CREATE_NEW_SECTION, UPDATE_PAGE_STATE, REMOVE_SECTION, UPDATE_SECTION_ID, UPDATE_SECTION_NAME } from '../actions/index'
import { addPage, removePage, updatePagePosition, updatePageName, updateCollapse, updatePageId, addPageComment, updateCommentId, deletePage, updatePageType, createNewSection, updatePageState, deletePageComment, updatePageComment, updatePagePersitence, removeSection, updateSectionId, updateSectionName } from '../helpers/tree_helper'

const sections = (state = [], action) => {
  switch (action.type) {
    case ADD_NEW_PAGE:
      return addPage(state, action.sectionId, action.pageType, action.parentId, action.position, action.timeStamp, action.uid)
    case REMOVE_PAGE:
      return removePage(state, action.id, action.sectionId)
    case UPDATE_PAGE_POSITION:
      return updatePagePosition(state, action.id, action.sectionId, action.newParentId, action.position)
    case UPDATE_PAGE_NAME:
      return updatePageName(state, action.id, action.sectionId, action.name)
    case UPDATE_PAGE_PERSISTENCE:
      return updatePagePersitence(state, action.id, action.sectionId)
    case CHANGE_COLLAPSE:
      return updateCollapse(state, action.id, action.sectionId)
    case UPDATE_ID:
      return updatePageId(state, action.id, action.sectionId, action.newId)
    case ADD_PAGE_COMMENT:
      return addPageComment(state, action.id, action.sectionId, action.commenter, action.message, action.tempId)
    case UPDATE_PAGE_COMMENT_ID:
      return updateCommentId(state, action.oldId, action.newId, action.sectionId, action.pageId)
    case UPDATE_PAGE_COMMENT:
      return updatePageComment(state, action.id, action.message, action.sectionId, action.pageId)
    case CHANGE_PAGE_TYPE:
      return updatePageType(state, action.pageId, action.sectionId, action.pageType)
    case CREATE_NEW_SECTION:
      return createNewSection(state, action.pageId, action.sectionId, action.newSectionName, action.timeStamp)
    case UPDATE_SECTION_ID:
      return updateSectionId(state, action.oldId, action.newId)
    case UPDATE_SECTION_NAME:
      return updateSectionName(state, action.section_id, action.newName)
    case REMOVE_SECTION:
      return removeSection(state, action.id)
    case UPDATE_PAGE_STATE:
      return updatePageState(state, action.pageId, action.sectionId, action.state)
    case DELETE_PAGE_COMMENT:
      return deletePageComment(state, action.commentId, action.pageId, action.sectionId)
    default:
      return state
  }
}

export default sections
