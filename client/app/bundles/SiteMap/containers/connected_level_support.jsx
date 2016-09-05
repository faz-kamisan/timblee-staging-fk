import { connect } from 'react-redux'
import { updatePagePosition, addNewPage, updateId } from '../actions'
import DroppableLevelSupport from '../components/level_support'

const mapStateToProps = (state) => {
  return { sitemapId: state.id }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageDrop: (id, sectionId, newParentId, position) => {
      dispatch(updatePagePosition(id,sectionId,  newParentId, position));
    },
    onPageTypeDrop: (sectionId, pageType, parentId, position, timeStamp) => {
      dispatch(addNewPage(sectionId, pageType, parentId, position, timeStamp));
    },
    onPageIdUpdate: (id, sectionId, newId) => {
      dispatch(updateId(id, sectionId, newId));
    }
  }
}

const ConnectedLevelSupport = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppableLevelSupport)

export default ConnectedLevelSupport
