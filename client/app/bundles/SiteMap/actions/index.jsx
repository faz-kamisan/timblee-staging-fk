export const SET_NAME = 'SET_NAME'
export const ADD_NEW_PAGE = 'ADD_NEW_PAGE'
export const REMOVE_PAGE = 'REMOVE_PAGE'
export const UPDATE_PAGE_POSITION = 'UPDATE_PAGE_POSITION'
export const UPDATE_PAGE_NAME = 'UPDATE_PAGE_NAME'
export const CHANGE_COLLAPSE = 'CHANGE_COLLAPSE'
export const UPDATE_ID = 'UPDATE_ID'

export function setName(name) {
  return { type: SET_NAME, name }
}

export function addNewPage(pageType, parentId, position, timeStamp) {
  return { type: ADD_NEW_PAGE, pageType, parentId, position, timeStamp }
}

export function removePage(id) {
  return { type: REMOVE_PAGE, id }
}

export function updatePageName(id, name) {
  return { type: UPDATE_PAGE_NAME, id, name }
}

export function updatePagePosition(id, newParentId, position) {
  return { type: UPDATE_PAGE_POSITION, id, newParentId, position}
}

export function changeCollapse(id) {
  return { type: CHANGE_COLLAPSE, id}
}

export function updateId(id, newId) {
  return { type: UPDATE_ID, id, newId}
}

changeCollapse
