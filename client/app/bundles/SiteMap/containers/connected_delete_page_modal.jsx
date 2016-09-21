import { connect } from 'react-redux'
import { removePage, setSaving } from '../actions'
import DeletePageModal from '../components/delete_page_modal'

const mapStateToProps = (state) => {
  return { pageTree: state.selectedPage }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageDelete: (pageTree) => {
      dispatch(removePage(pageTree.id, pageTree.section_id))
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
    }
  }
}

const ConnectedDeletePageModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePageModal)

export default ConnectedDeletePageModal
