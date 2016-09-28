import { connect } from 'react-redux'
import { setSaving, changeUpdatedAt, addPageComment, addFooterPageComment, updateFooterPageCommentId, addGeneralComment, updatePageCommentId, updateGeneralCommentId, setShowGuestInfoForm } from '../actions'
import NewComment from '../components/new_comment'

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser, currentGuest: state.currentGuest, business: state.business }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (commentableId, commentableType, footer, message, commenter, sectionId, tempId) => {
      if(commentableType == 'Page') {
        if(footer) {
          dispatch(addFooterPageComment(commentableId, message, commenter, tempId));
        } else {
          dispatch(addPageComment(commentableId, message, commenter, sectionId, tempId));
        }
      } else if(commentableType == 'Sitemap') {
        dispatch(addGeneralComment(message, commenter, tempId));
      }
    },
    onCommentIdUpdate: (commentableType, commentableId, footer, oldId, newId, sectionId) => {
      if(commentableType == 'Page') {
        if(footer) {
          dispatch(updateFooterPageCommentId(oldId, newId, commentableId));
        } else {
          dispatch(updatePageCommentId(oldId, newId, sectionId, commentableId));
        }
      } else if(commentableType == 'Sitemap') {
        dispatch(updateGeneralCommentId(oldId, newId));
      }
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
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
