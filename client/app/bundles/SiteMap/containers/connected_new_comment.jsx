import { connect } from 'react-redux'
import { setSaving, addPageComment, addGeneralComment, updatePageCommentId, updateGeneralCommentId, setShowGuestInfoForm } from '../actions'
import NewComment from '../components/new_comment'

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser, currentGuest: state.currentGuest, business: state.business }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (commentableId, commentableType, message, commenter, sectionId, tempId) => {
      if(commentableType == 'Page') {
        dispatch(addPageComment(commentableId, message, commenter, sectionId, tempId));
      } else if(commentableType == 'Sitemap') {
        dispatch(addGeneralComment(message, commenter, tempId));
      }
    },
    onCommentIdUpdate: (commentableType, commentableId, oldId, newId, sectionId) => {
      if(commentableType == 'Page') {
        dispatch(updatePageCommentId(oldId, newId, sectionId, commentableId));
      } else if(commentableType == 'Sitemap') {
        dispatch(updateGeneralCommentId(oldId, newId));
      }
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
    },
    setShowGuestInfoForm: (showGuestInfoForm) => {
      dispatch(setShowGuestInfoForm(showGuestInfoForm));
    }
  }
}

const ConnectedNewComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComment)

export default ConnectedNewComment
