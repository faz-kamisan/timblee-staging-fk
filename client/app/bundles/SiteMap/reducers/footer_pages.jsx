import { ADD_NEW_FOOTER_PAGE, UPDATE_FOOTER_PAGE_ID, UPDATE_GENERAL_COMMENT, DELETE_GENERAL_COMMENT } from '../actions/index'
function addFooterPage(footerPages, pageType, tempId) {
  var footerPagesCopy = Object.assign([], footerPages)
  var uids = []
  footerPagesCopy.each(function(footerPage, index) {
    uids.push(node.uid)
  })
  var newUid = Math.max.apply(null, uids) + 1
  var newFooterPage = { name: pageType.name, footer: true, pageType: pageType, children: [], comments: [], collapsed: false, state: 'active', id: tempId, uid: newUid};
  footerPagesCopy.push(newFooterPage)
  return footerPagesCopy
}

function updateId(footerPages, oldId, newId) {
  var footerPagesCopy = Object.assign([], footerPages)
  var footerPage = footerPagesCopy.filter(function(footerPage) { return footerPage.id == oldId })[0]
  footerPage.id = newId
  return footerPagesCopy
}

function updateCommentMessage(footerPages, id, message) {
  var footerPagesCopy = Object.assign([], footerPages)
  var comment = footerPagesCopy.filter(function(comment) { return comment.id == id })[0]
  comment.message = message
  return footerPagesCopy
}

function deleteComment(footerPages, id) {
  var footerPagesCopy = Object.assign([], footerPages)
  footerPagesCopy.removeIf(function(comment) { return comment.id == id })
  return footerPagesCopy
}

const footerPages = (state = [], action) => {
  switch (action.type) {
    case ADD_NEW_FOOTER_PAGE:
      return addFooterPage(state, action.pageType, action.timeStamp)
    case UPDATE_FOOTER_PAGE_ID:
      return updateId(state, action.oldId, action.newId)
    // case UPDATE_GENERAL_COMMENT:
    //   return updateCommentMessage(state, action.id, action.message)
    // case DELETE_GENERAL_COMMENT:
    //   return deleteComment(state, action.id)
    default:
      return state
  }
}

export default footerPages
