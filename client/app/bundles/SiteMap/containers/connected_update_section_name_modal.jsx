import { connect } from 'react-redux'
import { updateSectionName, changeUpdatedAt, setSaving } from '../actions'
import UpdateSectionNameModal from '../components/update_section_name_modal'

const mapStateToProps = (state) => {
  return { section: state.selectedSection }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSection: (sectionName, section_id) => {
      dispatch(updateSectionName(section_id, sectionName))
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedUpdateSectionNameModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateSectionNameModal)

export default ConnectedUpdateSectionNameModal
