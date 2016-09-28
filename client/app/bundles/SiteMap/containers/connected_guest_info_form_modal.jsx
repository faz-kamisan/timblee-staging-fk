import { connect } from 'react-redux'
import { setShowGuestInfoForm, setCurrentGuest } from '../actions'
import GuestInfoFormModal from '../components/guest_info_form_modal'

const mapStateToProps = (state) => {
  return { showForm: state.showGuestInfoForm }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (name, email) => {
      dispatch(setShowGuestInfoForm(false));
      dispatch(setCurrentGuest(name, email));
    }
  }
}

const ConnectedGuestInfoFormModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestInfoFormModal)

export default ConnectedGuestInfoFormModal
