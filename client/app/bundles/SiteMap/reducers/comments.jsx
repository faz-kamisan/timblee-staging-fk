import { ADD_GENERAL_COMMENT, UPDATE_GENERAL_COMMENT_ID, DELETE_GENERAL_COMMENT } from '../actions/index'

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

const comments = (state = [], action) => {
  switch (action.type) {
    case ADD_GENERAL_COMMENT:
      return addGeneralComment(state, action.message, action.commenter, action.tempId)
    case UPDATE_GENERAL_COMMENT_ID:
      return updateId(state, action.oldId, action.newId)
    case DELETE_GENERAL_COMMENT:
      return state.filter(function(comment) { return(comment.id != action.id) })
    default:
      return state
  }
}

export default comments
