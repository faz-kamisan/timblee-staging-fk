import { connect } from 'react-redux'
import { setSaving, deletePageComment, deleteGeneralComment, setSelectedComment } from '../actions'
import Comment from '../components/comment'

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser, currentGuest: state.currentGuest }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedComment: (comment) => {
      dispatch(setSelectedComment(comment))
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
