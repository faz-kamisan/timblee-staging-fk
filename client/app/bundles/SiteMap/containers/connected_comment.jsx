import { connect } from 'react-redux'
import { setSaving, deletePageComment, deleteGeneralComment } from '../actions'
import Comment from '../components/comment'

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser, currentGuest: state.currentGuest }
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
    }
  }
}

const ConnectedComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)

export default ConnectedComment
