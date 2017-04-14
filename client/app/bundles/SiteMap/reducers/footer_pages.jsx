import { ADD_NEW_FOOTER_PAGE, ADD_ORPHAN_PAGE_TO_FOOTER, UPDATE_FOOTER_PAGE_ID, UPDATE_FOOTER_PAGE_NAME, UPDATE_FOOTER_PAGE_PERSISTENCE, CHANGE_FOOTER_PAGE_TYPE, UPDATE_FOOTER_PAGE_STATE, ADD_FOOTER_PAGE_COMMENT, UPDATE_FOOTER_PAGE_COMMENT_ID, DELETE_FOOTER_PAGE_COMMENT, UPDATE_FOOTER_PAGE_COMMENT, REMOVE_FOOTER_PAGE } from '../actions/index'
function addFooterPage(footerPages, pageType, tempId, uid) {
  var footerPagesCopy = Object.assign([], footerPages)
  var pageTypeCopy = Object.assign({}, pageType);
  pageTypeCopy.icon_name = pageTypeCopy.iconName
  var newFooterPage = { name: pageType.name, footer: true, pageType: pageTypeCopy, children: [], comments: [], collapsed: false, state: 'active', id: tempId, uid: uid, newRecord: true};
  footerPagesCopy.push(newFooterPage)
  return footerPagesCopy
}

function addOrphanPageInFooter(footerPages, page) {
  var footerPagesCopy = Object.assign([], footerPages)
  var newFooterPage = { name: page.pageTree.name, footer: true, pageType: page.pageTree.page_type, children: [], comments: [], collapsed: false, state: 'active', id: page.id, uid: page.pageTree.uid, newRecord: false};
  footerPagesCopy.push(newFooterPage)
  return footerPagesCopy
}

function updateId(footerPages, oldId, newId) {
  var footerPagesCopy = Object.assign([], footerPages)
  var footerPage = footerPagesCopy.filter(function(footerPage) { return footerPage.id == oldId })[0]
  footerPage.id = newId
  return footerPagesCopy
}

function updatePageName(footerPages, id, name) {
  var footerPagesCopy = Object.assign([], footerPages)
  var footerPage = footerPagesCopy.filter(function(footerPage) { return footerPage.id == id })[0]
  footerPage.name = name
  return footerPagesCopy
}

function updatePagePersistence(footerPages, id) {
  var footerPagesCopy = Object.assign([], footerPages)
  var footerPage = footerPagesCopy.filter(function(footerPage) { return footerPage.id == id })[0]
  footerPage.newRecord = false
  return footerPagesCopy
}

function updatePageType(footerPages, id, pageType) {
  var footerPagesCopy = Object.assign([], footerPages)
  var footerPage = footerPagesCopy.filter(function(footerPage) { return footerPage.id == id })[0]
  footerPage.pageType = pageType
  return footerPagesCopy
}

function updatePageState(footerPages, id, state) {
  var footerPagesCopy = Object.assign([], footerPages)
  var footerPage = footerPagesCopy.filter(function(footerPage) { return footerPage.id == id })[0]
  footerPage.state = state
  return footerPagesCopy
}

function addPageComment(footerPages, id, commenter, message, tempId) {
  var footerPagesCopy = Object.assign([], footerPages)
  var footerPage = footerPagesCopy.filter(function(footerPage) { return footerPage.id == id })[0]
  var newComment = { message: message, commenter: commenter, id: tempId, created_at: 'Just now' }
  footerPage.comments.push(newComment)
  return footerPagesCopy
}

function updatePageCommentId(footerPages, oldId, newId, pageId) {
  var footerPagesCopy = Object.assign([], footerPages)
  var footerPage = footerPagesCopy.filter(function(footerPage) { return footerPage.id == pageId })[0]
  var comment = footerPage.comments.filter(function(comment) { return comment.id == oldId })[0]
  comment.id = newId
  return footerPagesCopy
}

function deleteFootePageComment(footerPages, commentId, pageId) {
  var footerPagesCopy = Object.assign([], footerPages)
  var footerPage = footerPagesCopy.filter(function(footerPage) { return footerPage.id == pageId })[0]
  footerPage.comments.removeIf(function(comment) { return comment.id == commentId })
  return footerPagesCopy
}

function updateFooterPageComment(footerPages, commentId, pageId, message) {
  var footerPagesCopy = Object.assign([], footerPages)
  var footerPage = footerPagesCopy.filter(function(footerPage) { return footerPage.id == pageId })[0]
  var comment = footerPage.comments.filter(function(comment) { return comment.id == commentId })[0]
  comment.message = message
  return footerPagesCopy
}

function removePage(footerPages, id) {
  var footerPagesCopy = Object.assign([], footerPages)
  var footerPage = footerPagesCopy.filter(function(footerPage) { return footerPage.id == id })[0]
  footerPage.state = 'archived'
  return footerPagesCopy
}

const footerPages = (state = [], action) => {
  switch (action.type) {
    case ADD_NEW_FOOTER_PAGE:
      return addFooterPage(state, action.pageType, action.timeStamp, action.uid)
    case ADD_ORPHAN_PAGE_TO_FOOTER:
      return addOrphanPageInFooter(state, action.page)
    case UPDATE_FOOTER_PAGE_ID:
      return updateId(state, action.oldId, action.newId)
    case UPDATE_FOOTER_PAGE_NAME:
      return updatePageName(state, action.id, action.name)
    case UPDATE_FOOTER_PAGE_PERSISTENCE:
      return updatePagePersistence(state, action.id)
    case CHANGE_FOOTER_PAGE_TYPE:
      return updatePageType(state, action.pageId, action.pageType)
    case UPDATE_FOOTER_PAGE_STATE:
      return updatePageState(state, action.pageId, action.state)
    case ADD_FOOTER_PAGE_COMMENT:
      return addPageComment(state, action.id, action.commenter, action.message, action.tempId)
    case UPDATE_FOOTER_PAGE_COMMENT_ID:
      return updatePageCommentId(state, action.oldId, action.newId, action.pageId)
    case DELETE_FOOTER_PAGE_COMMENT:
      return deleteFootePageComment(state, action.commentId, action.pageId)
    case UPDATE_FOOTER_PAGE_COMMENT:
      return updateFooterPageComment(state, action.id, action.pageId, action.message)
    case  REMOVE_FOOTER_PAGE:
      return removePage(state, action.id)
    default:
      return state
  }
}

export default footerPages
