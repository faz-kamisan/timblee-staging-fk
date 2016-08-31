import { connect } from 'react-redux'
import { updatePagePosition, addNewPage, updateId } from '../actions'
import DroppablePageTileTop from '../components/page_tile_top'

const mapStateToProps = (state) => {
  return { sitemapId: state.id }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageDrop: (id, newParentId, position) => {
      dispatch(updatePagePosition(id, newParentId, position));
    },
    onPageTypeDrop: (pageTypeId, parentId, position, timeStamp) => {
      dispatch(addNewPage(pageTypeId, parentId, position, timeStamp));
    },
    onPageIdUpdate: (id, newId) => {
      dispatch(updateId(id, newId));
    }
  }
}

const ConnectedPageTileTop = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppablePageTileTop)

export default ConnectedPageTileTop
