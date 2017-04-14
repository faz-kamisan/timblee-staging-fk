import { connect } from 'react-redux'
import { removePage, removeFooterPage, addOrphanPage, changeUpdatedAt, setSaving } from '../actions'
import DeletePageModal from '../components/delete_page_modal'

const mapStateToProps = (state) => {
  return { pageTree: state.selectedPage, pageTypes: state.pageTypes }
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
    onPageOrphan: (page, pageTypes) => {
      dispatch(addOrphanPage(page, pageTypes))
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
