import { connect } from 'react-redux'
import { updatePagePosition, changeUpdatedAt, addNewPage, setMaxPageUid, updateId, setSaving } from '../actions'
import DroppableLevelSupportBefore from '../components/level_support_before'

const mapStateToProps = (state) => {
  return { sitemapId: state.id, maxPageUid: state.maxPageUid }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageDrop: (id, sectionId, newParentId, position) => {
      dispatch(updatePagePosition(id,sectionId,  newParentId, position));
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

const ConnectedLevelSupportBefore = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppableLevelSupportBefore)

export default ConnectedLevelSupportBefore
