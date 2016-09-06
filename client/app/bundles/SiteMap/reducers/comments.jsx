import { ADD_GENERAL_COMMENT, UPDATE_GENERAL_COMMENT_ID } from '../actions/index'

function addGeneralComment(comments, message, commenter, tempId) {
  var commentsCopy = Object.assign([], comments)
  var newComment = { message: message, commenter: commenter, id: tempId }
  commentsCopy.push(newComment)
  return commentsCopy
}

function updateId(comments, oldId, newId) {
  var commentsCopy = Object.assign([], comments)
  var comment = commentsCopy.filter(function(comment) { return comment.id == oldId })[0]
  comment.id = newId
  return commentsCopy
}

const comments = (state = [], action) => {
  switch (action.type) {
    case ADD_GENERAL_COMMENT:
      return addGeneralComment(state, action.message, action.commenter, action.tempId)
    case UPDATE_GENERAL_COMMENT_ID:
      return updateId(state, action.oldId, action.newId)
    default:
      return state
  }
}

export default comments
