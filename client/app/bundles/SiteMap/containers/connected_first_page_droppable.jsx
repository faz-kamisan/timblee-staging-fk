import { connect } from 'react-redux'
import { updatePagePosition, removeOrphanPage, addOrphanPageToFooter, changeUpdatedAt, addNewPage, addNewFooterPage, setMaxPageUid, updateId, updateFooterPageId, setSaving } from '../actions'
import DroppableFirstPageDroppable from '../components/first_page_droppable'

const mapStateToProps = (state) => {
  return { sitemapId: state.id, maxPageUid: state.maxPageUid, pageType: (state.pageTypes.filter(function(pageType) { return(pageType.name == 'General 1') })[0]), activeSectionId: state.activeSectionId }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageDrop: (id, sectionId, newParentId, position) => {
      dispatch(updatePagePosition(id, sectionId, newParentId, position));
    },
    onOrphanPageDrop: (id, sectionId, newParentId, position) => {
      dispatch(updatePagePosition(id, sectionId, newParentId, position));
      dispatch(removeOrphanPage(id));
    },
    onFooterOrphanPageDrop: (page) => {
      dispatch(addOrphanPageToFooter(page));
      dispatch(removeOrphanPage(page.id));
    },
    onPageTypeDrop: (sectionId, pageType, parentId, position, timeStamp, maxPageUid) => {
      dispatch(addNewPage(sectionId, pageType, parentId, position, timeStamp, maxPageUid + 1));
      dispatch(setMaxPageUid(maxPageUid + 1))
    },
    onPageIdUpdate: (id, sectionId, newId) => {
      dispatch(updateId(id, sectionId, newId));
    },
    onFooterPageTypeDrop: (pageType, timeStamp, maxPageUid) => {
      dispatch(addNewFooterPage(pageType, timeStamp, maxPageUid + 1));
      dispatch(setMaxPageUid(maxPageUid + 1))
    },
    onFooterPageIdUpdate: (id, newId) => {
      dispatch(updateFooterPageId(id, newId));
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedFirstPageDroppable = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppableFirstPageDroppable)

export default ConnectedFirstPageDroppable
