import { connect } from 'react-redux'
import { deletePageComment, changeUpdatedAt, deleteGeneralComment, setSaving } from '../actions'
import CommentDeleteModal from '../components/comment_delete_modal'

const mapStateToProps = (state) => {
  return { comment: state.selectedComment }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (id, commentableId, commentableType, sectionId) => {
      if(commentableType == 'Page') {
        dispatch(deletePageComment(id, commentableId, sectionId))
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
