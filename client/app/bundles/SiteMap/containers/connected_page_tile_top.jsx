import { connect } from 'react-redux'
import { updatePagePosition, removeOrphanPage, addNewPage, setMaxPageUid, changeUpdatedAt, updateId, changeActiveSectionId, setSaving } from '../actions'
import DroppablePageTileTop from '../components/page_tile_top'

const mapStateToProps = (state) => {
  return { sitemapId: state.id, maxPageUid: state.maxPageUid, activeSectionId: state.activeSectionId }
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
    onPageTypeDrop: (sectionId, pageType, parentId, position, timeStamp, maxPageUid) => {
      dispatch(addNewPage(sectionId, pageType, parentId, position, timeStamp, maxPageUid + 1));
      dispatch(setMaxPageUid(maxPageUid + 1))
    },
    onPageIdUpdate: (id, sectionId, newId) => {
      dispatch(updateId(id, sectionId, newId));
    },
    changeActiveSectionId: (sectionId) => {
      dispatch(changeActiveSectionId(sectionId));
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedPageTileTop = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppablePageTileTop)

export default ConnectedPageTileTop
