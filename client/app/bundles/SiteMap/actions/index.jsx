export const SET_NAME = 'SET_NAME'
export const ADD_NEW_PAGE = 'ADD_NEW_PAGE'
export const REMOVE_PAGE = 'REMOVE_PAGE'
export const UPDATE_PAGE_POSITION = 'UPDATE_PAGE_POSITION'
export const UPDATE_PAGE_NAME = 'UPDATE_PAGE_NAME'
export const CHANGE_COLLAPSE = 'CHANGE_COLLAPSE'
export const UPDATE_ID = 'UPDATE_ID'
export const CHANGE_STATE = 'CHANGE_STATE'
export const SET_SAVING = 'SET_SAVING'
export const ADD_PAGE_COMMENT = 'ADD_PAGE_COMMENT'
export const ADD_GENERAL_COMMENT = 'ADD_GENERAL_COMMENT'
export const UPDATE_PAGE_COMMENT_ID = 'UPDATE_PAGE_COMMENT_ID'
export const UPDATE_GENERAL_COMMENT_ID = 'UPDATE_GENERAL_COMMENT_ID'
export const CHANGE_LEFT_SIDEBAR_EXPANDED = 'CHANGE_LEFT_SIDEBAR_EXPANDED'

export function setName(name) {
  return { type: SET_NAME, name }
}

export function addNewPage(sectionId, pageType, parentId, position, timeStamp) {
  return { type: ADD_NEW_PAGE, sectionId, pageType, parentId, position, timeStamp }
}

export function removePage(id, sectionId) {
  return { type: REMOVE_PAGE, id, sectionId }
}

export function updatePageName(id, sectionId, name) {
  return { type: UPDATE_PAGE_NAME, id, sectionId, name }
}

export function updatePagePosition(id, sectionId, newParentId, position) {
  return { type: UPDATE_PAGE_POSITION, id, sectionId, newParentId, position}
}

export function changeCollapse(id, sectionId, section_id) {
  return { type: CHANGE_COLLAPSE, id, sectionId}
}

export function updateId(id, sectionId, newId) {
  return { type: UPDATE_ID, id, sectionId, newId}
}

export function updateState(state) {
  return { type: CHANGE_STATE, state}
}

export function setSaving(saving) {
  return { type: SET_SAVING, saving }
}

export function addPageComment(id, message, commenter, sectionId, tempId) {
  return { type: ADD_PAGE_COMMENT, id, message, commenter, sectionId, tempId }
}

export function addGeneralComment(message, commenter, tempId) {
  return { type: ADD_GENERAL_COMMENT, message, commenter, tempId }
}

export function updatePageCommentId(oldId, newId, sectionId, pageId) {
  return { type: UPDATE_PAGE_COMMENT_ID, oldId, newId, sectionId, pageId }
}

export function updateGeneralCommentId(oldId, newId) {
  return { type: UPDATE_GENERAL_COMMENT_ID, oldId, newId }
}

export function changeLeftSideBarExpanded(expanded) {
  return { type: CHANGE_LEFT_SIDEBAR_EXPANDED, expanded }
}
