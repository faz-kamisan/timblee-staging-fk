import { connect } from 'react-redux'
import { updatePagePosition, addNewPage, updateId, setSaving } from '../actions'
import DroppableFirstPageDroppable from '../components/first_page_droppable'

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
    setSaving: (saving) => {
      dispatch(setSaving(saving));
    }
  }
}

const ConnectedFirstPageDroppable = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppableFirstPageDroppable)

export default ConnectedFirstPageDroppable
