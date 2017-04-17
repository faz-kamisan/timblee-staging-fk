import { connect } from 'react-redux'
import { removePage, removeFooterPage, addOrphanPage, changeUpdatedAt, setSaving } from '../actions'
import DeletePageModal from '../components/delete_page_modal'

const mapStateToProps = (state) => {
  return { pageTree: state.selectedPage }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageDelete: (pageTree, maxPageUid) => {
      if(pageTree.footer) {
        dispatch(removeFooterPage(pageTree.id))
      } else {
        dispatch(removePage(pageTree.id, pageTree.section_id))
      }
    },
    onPageOrphan: (pageTree) => {
      dispatch(addOrphanPage(pageTree))
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedDeletePageModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePageModal)

export default ConnectedDeletePageModal
