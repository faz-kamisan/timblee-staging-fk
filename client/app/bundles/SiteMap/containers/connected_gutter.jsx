import { connect } from 'react-redux'
import { updatePagePosition, addNewPage, updateId, setSaving } from '../actions'
import DroppableGutter from '../components/gutter'

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

const ConnectedGutter = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppableGutter)

export default ConnectedGutter
