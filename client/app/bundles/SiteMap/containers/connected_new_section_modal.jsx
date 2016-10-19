import { connect } from 'react-redux'
import { createNewSection, updateSectionId, changeActiveSectionId, changeUpdatedAt, setSaving } from '../actions'
import NewSectionModal from '../components/new_section_modal'

const mapStateToProps = (state) => {
  return { pageTree: state.selectedPage, sections: state.sections }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateSection: (pageTree, sectionName, timeStamp, sections) => {
      dispatch(createNewSection(pageTree.id, pageTree.section_id, sectionName, timeStamp))
    },
    onSectionIdUpdate: (oldId, newId) => {
      dispatch(updateSectionId(oldId, newId));
      dispatch(changeActiveSectionId(sectionId));
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
