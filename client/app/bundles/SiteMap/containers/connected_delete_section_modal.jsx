import { connect } from 'react-redux'
import { removeSection, changeUpdatedAt, setSaving, changeActiveSectionId } from '../actions'
import DeleteSectionModal from '../components/delete_section_modal'

const mapStateToProps = (state) => {
  return { section: state.selectedSection, sections: state.sections}
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSection: (id) => {
      dispatch(removeSection(id));
    },
    changeActiveSectionId: (sectionId) => {
      dispatch(changeActiveSectionId(sectionId));
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedDeleteSectionModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteSectionModal)

export default ConnectedDeleteSectionModal
