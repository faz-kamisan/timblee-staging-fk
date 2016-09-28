import { connect } from 'react-redux'
import { changeUpdatedAt, setSaving } from '../actions'
import PageCommentsModal from '../components/page_comments_modal'

const mapStateToProps = (state) => {
  return { pageTree: state.selectedPage, commentsLength: (state.selectedPage.comments ? state.selectedPage.comments.length : 0), pageState: state.selectedPage.state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedPageCommentsModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCommentsModal)

export default ConnectedPageCommentsModal
