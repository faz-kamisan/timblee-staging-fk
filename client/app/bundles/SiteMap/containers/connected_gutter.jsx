import { connect } from 'react-redux'
import { updatePagePosition, addNewPage, updateId } from '../actions'
import DroppableGutter from '../components/gutter'

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

const ConnectedGutter = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppableGutter)

export default ConnectedGutter
