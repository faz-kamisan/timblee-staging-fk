import { connect } from 'react-redux'
import { updatePagePosition, addNewPage, updateId } from '../actions'
import DroppableLevelSupport from '../components/level_support'

const mapStateToProps = (state) => {
  return { sitemapId: state.id }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageDrop: (id, newParentId, position) => {
      dispatch(updatePagePosition(id, newParentId, position));
    },
    onPageTypeDrop: (pageType, parentId, position, timeStamp) => {
      dispatch(addNewPage(pageType, parentId, position, timeStamp));
    },
    onPageIdUpdate: (id, newId) => {
      dispatch(updateId(id, newId));
    }
  }
}

const ConnectedLevelSupport = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppableLevelSupport)

export default ConnectedLevelSupport
