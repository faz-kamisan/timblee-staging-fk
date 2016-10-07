import { connect } from 'react-redux'
import { createNewSection, updateSectionId, changeUpdatedAt, setSaving } from '../actions'
import NewSectionModal from '../components/new_section_modal'

const mapStateToProps = (state) => {
  return { pageTree: state.selectedPage }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateSection: (pageTree, sectionName, timeStamp) => {
      dispatch(createNewSection(pageTree.id, pageTree.section_id, sectionName, timeStamp))
    },
    onSectionIdUpdate: (oldId, newId) => {
      dispatch(updateSectionId(oldId, newId));
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedNewSectionModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSectionModal)

export default ConnectedNewSectionModal
