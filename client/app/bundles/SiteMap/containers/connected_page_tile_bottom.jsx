import { connect } from 'react-redux'
import { updatePagePosition, addNewPage, setMaxPageUid, changeUpdatedAt, updateId, setSaving } from '../actions'
import DroppablePageTileBottom from '../components/page_tile_Bottom'

const mapStateToProps = (state) => {
  return { sitemapId: state.id, maxPageUid: state.maxPageUid, trial: state.trial }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageDrop: (id, sectionId, newParentId, position) => {
      dispatch(updatePagePosition(id, sectionId,  newParentId, position));
    },
    onPageTypeDrop: (sectionId, pageType, parentId, position, timeStamp, maxPageUid) => {
      dispatch(addNewPage(sectionId, pageType, parentId, position, timeStamp, maxPageUid + 1));
      dispatch(setMaxPageUid(maxPageUid + 1))
    },
    onPageIdUpdate: (id, sectionId, newId) => {
      dispatch(updateId(id, sectionId, newId));
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedPageTileBottom = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppablePageTileBottom)

export default ConnectedPageTileBottom
