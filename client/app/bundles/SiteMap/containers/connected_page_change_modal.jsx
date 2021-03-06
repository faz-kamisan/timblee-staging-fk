import { connect } from 'react-redux'
import { changePageType, changeFooterPageType, changeUpdatedAt, setSaving } from '../actions'
import PageChangeModal from '../components/page_change_modal'

const mapStateToProps = (state) => {
  return { pageTree: state.selectedPage, currentPageType: state.selectedPage.pageType, pageTypes: state.pageTypes }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageTypeChange: (pageTree, pageType) => {
      if(pageTree.footer) {
        dispatch(changeFooterPageType(pageTree.id, pageType))
      } else {
        dispatch(changePageType(pageTree.id, pageTree.section_id, pageType))
      }
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedPageChangeModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageChangeModal)

export default ConnectedPageChangeModal
