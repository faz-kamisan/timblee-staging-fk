import { connect } from 'react-redux'
import { addNewFooterPage, addOrphanPageToFooter, removeOrphanPage, changeUpdatedAt, updateFooterPageId, setSaving, setMaxPageUid } from '../actions'
import DroppableFooter from '../components/footer'

const mapStateToProps = (state) => {
  return { sitemapId: state.id, leftSidebarExpanded: state.leftSidebarExpanded, footerPages: state.footerPages, maxPageUid: state.maxPageUid, publicShare: state.publicShare }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageTypeDrop: (pageType, timeStamp, maxPageUid) => {
      dispatch(addNewFooterPage(pageType, timeStamp, maxPageUid + 1));
      dispatch(setMaxPageUid(maxPageUid + 1))
    },
    onOrphanPageDrop: (page) => {
      dispatch(addOrphanPageToFooter(page));
      dispatch(removeOrphanPage(page.id));
    },
    onPageIdUpdate: (id, newId) => {
      dispatch(updateFooterPageId(id, newId));
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedFooter = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppableFooter)

export default ConnectedFooter
