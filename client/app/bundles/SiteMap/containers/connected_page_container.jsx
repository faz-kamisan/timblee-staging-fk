import { connect } from 'react-redux'
import { updatePagePosition, addNewPage } from '../actions'
import DraggablePageContainer from '../components/page_container'

const mapStateToProps = (state) => {
  return { pageTree: state.pageTree, sitemapId: state.id }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageDrop: (id, newParentId) => {
      dispatch(updatePagePosition(id, newParentId));
    },
    onPageTypeDrop: (pageTypeId, parentId) => {
      dispatch(addNewPage(pageTypeId, parentId));
    }
  }
}

const ConnectedPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DraggablePageContainer)

export default ConnectedPageContainer
