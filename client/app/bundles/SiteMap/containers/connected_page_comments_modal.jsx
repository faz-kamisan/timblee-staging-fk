import { connect } from 'react-redux'
import { removePage, setSaving } from '../actions'
import PageCommentsModal from '../components/page_comments_modal'

const mapStateToProps = (state) => {
  return { pageTree: state.selectedPage }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSaving: (saving) => {
      dispatch(setSaving(saving));
    }
  }
}

const ConnectedPageCommentsModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCommentsModal)

export default ConnectedPageCommentsModal
