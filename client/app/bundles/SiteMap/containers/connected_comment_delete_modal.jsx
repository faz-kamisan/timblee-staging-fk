import { connect } from 'react-redux'
import { deletePageComment, deleteFooterPageComment, changeUpdatedAt, deleteGeneralComment, setSaving } from '../actions'
import CommentDeleteModal from '../components/comment_delete_modal'

const mapStateToProps = (state) => {
  return { comment: state.selectedComment }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (id, commentableId, commentableType, footer, sectionId) => {
      if(commentableType == 'Page') {
        if(footer) {
          dispatch(deleteFooterPageComment(id, commentableId))
        } else {
          dispatch(deletePageComment(id, commentableId, sectionId))
        }
      } else {
        dispatch(deleteGeneralComment(id))
      }
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedCommentDeleteModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDeleteModal)

export default ConnectedCommentDeleteModal
