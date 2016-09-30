import { connect } from 'react-redux'
import { removeSection, setSaving } from '../actions'
import DeleteSectionModal from '../components/delete_section_modal'

const mapStateToProps = (state) => {
  return { section: state.selectedSection }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSection: (id) => {
      dispatch(removeSection(id));
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
