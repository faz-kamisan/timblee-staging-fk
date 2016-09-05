import { connect } from 'react-redux'
import { setName, updateState, setSaving } from '../actions'
import Header from '../components/header'

const mapStateToProps = (state) => {
  return { name: state.name, id: state.id, state: state.state, saving: state.saving }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (name) => {
      dispatch(setName(name));
    },
    onStateChange: (state) => {
      dispatch(updateState(state));
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
    }
  }
}

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default ConnectedHeader
