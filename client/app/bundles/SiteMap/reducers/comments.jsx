import { ADD_GENERAL_COMMENT, UPDATE_GENERAL_COMMENT_ID, UPDATE_GENERAL_COMMENT, DELETE_GENERAL_COMMENT } from '../actions/index'

function addGeneralComment(comments, message, commenter, tempId) {
  var commentsCopy = Object.assign([], comments)
  var newComment = { message: message, commenter: commenter, id: tempId, created_at: 'Just now', state: 'active' }
  commentsCopy.push(newComment)
  return commentsCopy
}

function updateId(comments, oldId, newId) {
  var commentsCopy = Object.assign([], comments)
  var comment = commentsCopy.filter(function(comment) { return comment.id == oldId })[0]
  comment.id = newId
  return commentsCopy
}

function updateCommentMessage(comments, id, message) {
  var commentsCopy = Object.assign([], comments)
  var comment = commentsCopy.filter(function(comment) { return comment.id == id })[0]
  comment.message = message
  return commentsCopy
}

function deleteComment(comments, id) {
  var commentsCopy = Object.assign([], comments)
  commentsCopy.removeIf(function(comment) { return comment.id == id })
  return commentsCopy
}

const comments = (state = [], action) => {
  switch (action.type) {
    case ADD_GENERAL_COMMENT:
      return addGeneralComment(state, action.message, action.commenter, action.tempId)
    case UPDATE_GENERAL_COMMENT_ID:
      return updateId(state, action.oldId, action.newId)
    case UPDATE_GENERAL_COMMENT:
      return updateCommentMessage(state, action.id, action.message)
    case DELETE_GENERAL_COMMENT:
      return deleteComment(state, action.id)
    default:
      return state
  }
}

export default comments
