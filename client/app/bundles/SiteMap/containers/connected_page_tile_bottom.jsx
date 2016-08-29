import { connect } from 'react-redux'
import { updatePagePosition, addNewPage } from '../actions'
import DroppablePageTileBottom from '../components/page_tile_Bottom'

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

const ConnectedPageTileBottom = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppablePageTileBottom)

export default ConnectedPageTileBottom
