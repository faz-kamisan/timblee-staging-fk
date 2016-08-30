import { connect } from 'react-redux'
import { updatePagePosition, addNewPage } from '../actions'
import DroppableLevelSupport from '../components/level_support'

const mapStateToProps = (state) => {
  return { sitemapId: state.id }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageDrop: (id, newParentId, position) => {
      dispatch(updatePagePosition(id, newParentId, position));
    },
    onPageTypeDrop: (pageTypeId, parentId, position) => {
      dispatch(addNewPage(pageTypeId, parentId, position));
    }
  }
}

const ConnectedLevelSupport = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppableLevelSupport)

export default ConnectedLevelSupport
