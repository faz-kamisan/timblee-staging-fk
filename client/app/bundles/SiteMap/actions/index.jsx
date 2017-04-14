export const SET_NAME = 'SET_NAME'
export const ADD_NEW_PAGE = 'ADD_NEW_PAGE'
export const REMOVE_PAGE = 'REMOVE_PAGE'
export const REMOVE_FOOTER_PAGE = 'REMOVE_FOOTER_PAGE'
export const UPDATE_PAGE_POSITION = 'UPDATE_PAGE_POSITION'
export const UPDATE_PAGE_NAME = 'UPDATE_PAGE_NAME'
export const UPDATE_FOOTER_PAGE_NAME = 'UPDATE_FOOTER_PAGE_NAME'
export const UPDATE_PAGE_PERSISTENCE = 'UPDATE_PAGE_PERSISTENCE'
export const UPDATE_FOOTER_PAGE_PERSISTENCE = 'UPDATE_FOOTER_PAGE_PERSISTENCE'
export const CHANGE_COLLAPSE = 'CHANGE_COLLAPSE'
export const UPDATE_ID = 'UPDATE_ID'
export const CHANGE_STATE = 'CHANGE_STATE'
export const SET_SAVING = 'SET_SAVING'
export const CHANGE_UPDATED_AT = 'CHANGE_UPDATED_AT'
export const ADD_PAGE_COMMENT = 'ADD_PAGE_COMMENT'
export const ADD_FOOTER_PAGE_COMMENT = 'ADD_FOOTER_PAGE_COMMENT'
export const ADD_GENERAL_COMMENT = 'ADD_GENERAL_COMMENT'
export const UPDATE_PAGE_COMMENT_ID = 'UPDATE_PAGE_COMMENT_ID'
export const UPDATE_FOOTER_PAGE_COMMENT_ID = 'UPDATE_FOOTER_PAGE_COMMENT_ID'
export const UPDATE_GENERAL_COMMENT_ID = 'UPDATE_GENERAL_COMMENT_ID'
export const CHANGE_LEFT_SIDEBAR_EXPANDED = 'CHANGE_LEFT_SIDEBAR_EXPANDED'
export const SET_SHOW_GUEST_INFO_FORM = 'SET_SHOW_GUEST_INFO_FORM'
export const SET_CURRENT_GUEST = 'SET_CURRENT_GUEST'
export const SHOW_SITEMAP_SHARE_MODAL = 'SHOW_SITEMAP_SHARE_MODAL'
export const UPDATE_GENERAL_COMMENT = 'UPDATE_GENERAL_COMMENT'
export const UPDATE_PAGE_COMMENT = 'UPDATE_PAGE_COMMENT'
export const UPDATE_FOOTER_PAGE_COMMENT = 'UPDATE_FOOTER_PAGE_COMMENT'
export const DELETE_GENERAL_COMMENT = 'DELETE_GENERAL_COMMENT'
export const DELETE_PAGE_COMMENT = 'DELETE_PAGE_COMMENT'
export const DELETE_FOOTER_PAGE_COMMENT = 'DELETE_FOOTER_PAGE_COMMENT'
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE'
export const SET_SELECTED_SECTION = 'SET_SELECTED_SECTION'
export const SET_SELECTED_COMMENT = 'SET_SELECTED_COMMENT'
export const CHANGE_PAGE_TYPE = 'CHANGE_PAGE_TYPE'
export const CHANGE_FOOTER_PAGE_TYPE = 'CHANGE_FOOTER_PAGE_TYPE'
export const CREATE_NEW_SECTION = 'CREATE_NEW_SECTION'
export const UPDATE_PAGE_STATE = 'UPDATE_PAGE_STATE'
export const UPDATE_FOOTER_PAGE_STATE = 'UPDATE_FOOTER_PAGE_STATE'
export const REMOVE_ORPHAN_PAGE = 'REMOVE_ORPHAN_PAGE'
export const ADD_ORPHAN_PAGE_TO_FOOTER = 'ADD_ORPHAN_PAGE_TO_FOOTER'
export const ADD_ORPHAN_PAGE = 'ADD_ORPHAN_PAGE'
export const ADD_NEW_FOOTER_PAGE = 'ADD_NEW_FOOTER_PAGE'
export const UPDATE_FOOTER_PAGE_ID = 'UPDATE_FOOTER_PAGE_ID'
export const SET_MAX_PAGE_UID = 'SET_MAX_PAGE_UID'
export const ADD_SHARED_USERS = 'ADD_SHARED_USERS'
export const REMOVE_SECTION = 'REMOVE_SECTION'
export const SET_INTRO_SLIDE_NUMBER = 'SET_INTRO_SLIDE_NUMBER'
export const UPDATE_SECTION_ID = 'UPDATE_SECTION_ID'
export const CHANGE_ACTIVE_SECTION_ID = 'CHANGE_ACTIVE_SECTION_ID'
export const UPDATE_SECTION_NAME = 'UPDATE_SECTION_NAME'

export function setName(name) {
  return { type: SET_NAME, name }
}

export function addNewPage(sectionId, pageType, parentId, position, timeStamp, uid) {
  return { type: ADD_NEW_PAGE, sectionId, pageType, parentId, position, timeStamp, uid }
}

export function removePage(id, sectionId) {
  return { type: REMOVE_PAGE, id, sectionId }
}

export function removeFooterPage(id) {
  return { type: REMOVE_FOOTER_PAGE, id }
}

export function updatePageName(id, sectionId, name) {
  return { type: UPDATE_PAGE_NAME, id, sectionId, name }
}

export function updateFooterPageName(id, name) {
  return { type: UPDATE_FOOTER_PAGE_NAME, id, name }
}

export function updatePagePersitence(id, sectionId) {
  return { type: UPDATE_PAGE_PERSISTENCE, id, sectionId }
}

export function updateFooterPagePersitence(id, sectionId) {
  return { type: UPDATE_FOOTER_PAGE_PERSISTENCE, id }
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

export function changeUpdatedAt() {
  return { type: CHANGE_UPDATED_AT }
}

export function addPageComment(id, message, commenter, sectionId, tempId) {
  return { type: ADD_PAGE_COMMENT, id, message, commenter, sectionId, tempId }
}

export function addFooterPageComment(id, message, commenter, tempId) {
  return { type: ADD_FOOTER_PAGE_COMMENT, id, message, commenter, tempId }
}

export function addGeneralComment(message, commenter, tempId) {
  return { type: ADD_GENERAL_COMMENT, message, commenter, tempId }
}

export function updatePageCommentId(oldId, newId, sectionId, pageId) {
  return { type: UPDATE_PAGE_COMMENT_ID, oldId, newId, sectionId, pageId }
}

export function updateFooterPageCommentId(oldId, newId, pageId) {
  return { type: UPDATE_FOOTER_PAGE_COMMENT_ID, oldId, newId, pageId }
}

export function updateGeneralCommentId(oldId, newId) {
  return { type: UPDATE_GENERAL_COMMENT_ID, oldId, newId }
}

export function changeLeftSideBarExpanded(expanded) {
  return { type: CHANGE_LEFT_SIDEBAR_EXPANDED, expanded }
}

export function setShowGuestInfoForm(showGuestInfoForm) {
  return { type: SET_SHOW_GUEST_INFO_FORM, showGuestInfoForm }
}

export function setCurrentGuest(name, email) {
  return { type: SET_CURRENT_GUEST, name, email }
}

export function showSitemapShareModal(value) {
  return { type: SHOW_SITEMAP_SHARE_MODAL, value }
}

export function updateGeneralComment(id, message) {
  return { type: UPDATE_GENERAL_COMMENT, id, message }
}

export function updatePageComment(id, pageId, message, sectionId) {
  return { type: UPDATE_PAGE_COMMENT, id, pageId, message, sectionId }
}

export function updateFooterPageComment(id, pageId, message) {
  return { type: UPDATE_FOOTER_PAGE_COMMENT, id, pageId, message }
}

export function deleteGeneralComment(id) {
  return { type: DELETE_GENERAL_COMMENT, id }
}

export function deletePageComment(commentId, pageId, sectionId) {
  return { type: DELETE_PAGE_COMMENT, commentId, pageId, sectionId }
}

export function deleteFooterPageComment(commentId, pageId) {
  return { type: DELETE_FOOTER_PAGE_COMMENT, commentId, pageId }
}

export function setSelectedPage(page) {
  return { type: SET_SELECTED_PAGE, page }
}

export function setSelectedSection(section) {
  return { type: SET_SELECTED_SECTION, section }
}

export function setSelectedComment(comment) {
  return { type: SET_SELECTED_COMMENT, comment }
}

export function changePageType(pageId, sectionId, pageType) {
  return { type: CHANGE_PAGE_TYPE, pageId, sectionId, pageType }
}

export function changeFooterPageType(pageId, pageType) {
  return { type: CHANGE_FOOTER_PAGE_TYPE, pageId, pageType }
}

export function createNewSection(pageId, sectionId, newSectionName, timeStamp) {
  return { type: CREATE_NEW_SECTION, pageId, sectionId, newSectionName, timeStamp }
}

export function updatePageState(pageId, sectionId, state) {
  return { type: UPDATE_PAGE_STATE, pageId, sectionId, state }
}

export function updateFooterPageState(pageId, state) {
  return { type: UPDATE_FOOTER_PAGE_STATE, pageId, state }
}

export function addNewFooterPage(pageType, timeStamp, uid) {
  return { type: ADD_NEW_FOOTER_PAGE, pageType, timeStamp, uid }
}

export function addOrphanPageToFooter(page) {
  return { type: ADD_ORPHAN_PAGE_TO_FOOTER, page }
}

export function addOrphanPage(page, pageTypes) {
  return { type: ADD_ORPHAN_PAGE, page, pageTypes }
}

export function removeOrphanPage(id) {
  return { type: REMOVE_ORPHAN_PAGE, id }
}

export function updateFooterPageId(oldId, newId) {
  return { type: UPDATE_FOOTER_PAGE_ID, oldId, newId }
}

export function setMaxPageUid(uid) {
  return {type: SET_MAX_PAGE_UID, uid}
}

export function addSharedUsers(emails) {
  return {type: ADD_SHARED_USERS, emails}
}

export function removeSection(id) {
  return {type: REMOVE_SECTION, id}
}

export function setIntroSlideNumber(introSlideNumber) {
  return {type: SET_INTRO_SLIDE_NUMBER, introSlideNumber}
}

export function updateSectionId(oldId, newId) {
  return {type: UPDATE_SECTION_ID, oldId, newId}
}

export function changeActiveSectionId(sectionId) {
  return {type: CHANGE_ACTIVE_SECTION_ID, sectionId}
}

export function updateSectionName(section_id, newName) {
  return {type: UPDATE_SECTION_NAME, section_id, newName}
}
