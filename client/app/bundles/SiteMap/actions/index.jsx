export const SET_NAME = 'SET_NAME'
export const ADD_NEW_PAGE = 'ADD_NEW_PAGE'
export const REMOVE_PAGE = 'REMOVE_PAGE'
export const UPDATE_PAGE_POSITION = 'UPDATE_PAGE_POSITION'
export const UPDATE_PAGE_NAME = 'UPDATE_PAGE_NAME'

export function setName(name) {
  return { type: SET_NAME, name }
}

export function addNewPage(parentId) {
  return { type: ADD_NEW_PAGE, parentId }
}

export function removePage(id) {
  return { type: REMOVE_PAGE, id }
}

export function updatePageName(id, name) {
  return { type: UPDATE_PAGE_NAME, id, name }
}

export function updatePagePosition(id, newParentId) {
  return { type: UPDATE_PAGE_POSITION, id, newParentId }
}
