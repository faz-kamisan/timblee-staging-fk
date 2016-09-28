import { connect } from 'react-redux'
import { setSaving, changeUpdatedAt, updatePageComment, updateFooterPageComment, updateGeneralComment } from '../actions'
import CommentEditor from '../components/comment_editor'

const mapStateToProps = (state) => {
  return { business: state.business }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateComment: (id, commentableId, commentableType, footer, message, sectionId) => {
      if(commentableType == 'Page') {
        if(footer) {
          dispatch(updateFooterPageComment(id, commentableId, message));
        } else {
          dispatch(updatePageComment(id, commentableId, message, sectionId));
        }
      } else if(commentableType == 'Sitemap') {
        dispatch(updateGeneralComment(id, message));
      }
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedCommentEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentEditor)

export default ConnectedCommentEditor
