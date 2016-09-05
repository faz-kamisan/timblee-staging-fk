import { connect } from 'react-redux'
import { updatePagePosition, addNewPage, updateId, updatePageName } from '../actions'
import DroppablePageTileTop from '../components/page_tile_top'

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
    },
    onNameChange: (id, sectionId, name) => {
      dispatch(updatePageName(id, sectionId, name));
    }
  }
}

const ConnectedPageTileTop = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppablePageTileTop)

export default ConnectedPageTileTop
